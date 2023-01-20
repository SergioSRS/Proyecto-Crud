/**
	@file Contiene la vista consulta de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaAlta extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador

		/*Valores para hacer un alta*/
		this.iNombre = this.div.getElementsByTagName('input')[0]
		this.iPrecio = this.div.getElementsByTagName('input')[1]
		this.iFecha = this.div.getElementsByTagName('input')[2]
		this.iDescripcion = this.div.getElementsByTagName('input')[3]
		this.iEdad = this.div.getElementsByTagName('select')[0]
		this.iFile= this.div.getElementsByTagName('input')[4]	
	

		this.iTematicas = this.div.getElementsByClassName('tematica')

		this.iEstado = this.div.getElementsByClassName('estado')

		this.iCancelar = this.div.getElementsByTagName('button')[0]
       	this.iAceptar = this.div.getElementsByTagName('button')[1]
        

	   //Evento que le asocio al elemento

		this.iAceptar.onclick = this.aceptar.bind(this)
		this.iCancelar.onclick = this.cancelar.bind(this)
		
		
		
		this.estado = true;
    }
	cancelar(){
		this.apagarAlertas()
		this.controlador.cancelar()
		
	}
	/**
	 * Apaga las alertas del formulario
	 */
	apagarAlertas(){
		this.iNombre.style.backgroundColor="white"
		this.iPrecio.style.backgroundColor="white"
		this.iFecha.style.backgroundColor="white"
		this.iDescripcion.style.backgroundColor="white"
	}
	/**
	 * Metodo para ingresar un registro (valida los campos)
	 */
	aceptar(){
		this.apagarAlertas()
		//Queremos esto en local, el registro de tematicas se hará una vez por click
		let tematicas = []

	if (this.iEstado[0].checked){
		this.estado=true
	
	}
	if (this.iEstado[1].checked){
		this.estado=false
		
	}
	
	
	if (this.iTematicas[0].checked){
		tematicas.push(this.iTematicas[0].value)
	}
	if (this.iTematicas[1].checked){
		tematicas.push(this.iTematicas[1].value)
	}
	if (this.iTematicas[2].checked){
		tematicas.push(this.iTematicas[2].value)
	}
	if (!this.iTematicas[0].checked && !this.iTematicas[1].checked && !this.iTematicas[2].checked)
		tematicas.push("No tiene tematicas relacionadas")
	
		let expRegNombre = /^[A-Z][a-z]{2,9}$/
		let expRegSoloNumeros=/^[0-9]+$/;

		try{
			if(!expRegNombre.test(this.iNombre.value)){
				this.iNombre.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Introduce un nombre válido"
			}
			if(!expRegSoloNumeros.test(this.iPrecio.value)){
				this.iPrecio.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Debes de introducir un numero"
			}
			if(!this.iFecha.value ){
				this.iFecha.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Debes de introducir una fecha de aparición correcta"
			}
			
			if(!this.iDescripcion.value){
				this.iDescripcion.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Debes introducir una descripcion"
			}
		
			if(this.iEdad.value != "+18" && this.iEdad.value != "+13" && this.iEdad.value != "+7" && this.iEdad.value != "+3")
			throw "Debes introducir una Edad Recomendada"

		
			/*Me lleva al controlador los datos*/
			alert("Estas seguro de ingresar este juego?")
				this.controlador.aceptarAlta(this.iNombre.value, this.iPrecio.value, this.iFecha.value,
				this.iDescripcion.value, this.iEdad.value,tematicas,this.estado,this.iFile.files[0])
			
				
			/*Me reseta los valores de los campos*/
				
				this.iNombre.value=""
				this.iPrecio.value=0
				this.iFecha.value=""
				this.iDescripcion.value=""
				this.iFile.value = null
				this.iTematicas[0].checked = false
				this.iTematicas[1].checked = false
				this.iTematicas[2].checked = false

	
		}
		catch(error){
			
		}
	}
}
