/**
	@file Contiene la vista inicial de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaInicio extends Vista{
	/**
		Constructor de la clase
	**/
	constructor(div,controlador){
		super(div)
		//Hacemos que la VistaCRUD "observe" al Modelo
		this.controlador = controlador
		this.modelo = this.controlador.getModelo()

		this.modelo.registrar(this.actualizar.bind(this))
		//Elemento html
		this.buscar = this.div.getElementsByTagName('svg')[0]
		this.anadir = this.div.getElementsByTagName('svg')[1]
		//Evento
		this.anadir.onclick = this.pulsarAnadir.bind(this)
		this.buscar.onclick = this.pulsarBuscar.bind(this)

		//Menu opciones
		this.buscarNombre = this.div.getElementsByTagName('input')[0]
	
	

		//Tabla
		this.tabla = this.div.getElementsByTagName('tbody')[0]
	}
	pulsarAnadir(){
		this.controlador.pulsarAlta()
	}
	pulsarBuscar(){
		this.controlador.pulsarBusqueda(this.buscarNombre.value)
		this.actualizar()
	}
	/**
	 * Refresca y crea la tabla de ingresos de la consulta
	 */
	actualizar(){
	
		this.borrarIngresos()
		
		let datos = this.modelo.getDatos()
		if(datos != null)
		{
			for (let dato of datos){

				let tr = document.createElement('tr')
				this.tabla.appendChild(tr)
				let td1 = document.createElement('td')
				tr.appendChild(td1)
				td1.textContent = dato.nombre
			
				let td2 = document.createElement('td')
				tr.appendChild(td2)
				if (dato.file){
					
					let img = document.createElement('img')
					img.setAttribute('width', '96px')
					img.setAttribute('height', '96px')
					img.setAttribute('src', dato.file)
					td2.appendChild(img)
				}
				else{
					td2.textContent=("Sin foto 😞")
				}
				let td3 = document.createElement('td')
			
				tr.appendChild(td3)
				let spanEliminar = document.createElement('span')
				td3.appendChild(spanEliminar)
				spanEliminar.classList.add('icono')
				spanEliminar.textContent = '🗑'
				spanEliminar.onclick = this.eliminar.bind(this, dato.id)
				
			
				let spanConsultar = document.createElement('span')
				td3.appendChild(spanConsultar)
				spanConsultar.classList.add('icono')
				spanConsultar.textContent = '🔎'
				spanConsultar.onclick = this.consultar.bind(this, dato)
			
			
				let spanEditar = document.createElement('span')
				td3.appendChild(spanEditar)
				spanEditar.classList.add('icono')
				spanEditar.textContent = '✏'
				spanEditar.onclick = this.editar.bind(this, dato)
				
		}
		if(datos.length==0)
		{
			let tr = document.createElement('tr')
			this.tabla.appendChild(tr)
			let td1 = document.createElement('td')
			tr.appendChild(td1)
			td1.textContent = "No hay registros"
			td1.setAttribute("colspan", "3")
		}
	
	}
	}
	/**
	 * Metodo para borrar los registros de la vista
	 */
	borrarIngresos(){
		while (this.tabla.firstElementChild)
		this.tabla.firstElementChild.remove()
	}
	/** 
	 * Metodo para consultar un registro 
	*/
	consultar(dato){	
		this.controlador.pulsarConsulta(dato);
	}
	eliminar(id){	
		this.controlador.eliminarVideojuego(id)
		this.actualizar();
	}
	editar(dato){
		this.controlador.pulsarModificar(dato);
		this.actualizar();
	}
	
}
