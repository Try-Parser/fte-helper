<template>
	<b-container fluid>
		<b-row class="input-group">
			<b-col sm="3">
				<label for=""> {{ proper_label }} <span v-if="required" class="req">*</span> </label>
			</b-col>
			<b-col sm="9">
				<b-row>
					<b-col cols="11">
						<b-form-input :id="id" :type="type" v-model="inp_val" /> 
					</b-col>
					<b-col cols="1">
						<fa :icon="status" v-bind:class="{ 'fa-spin': spin }" v-if="show_icon"/>
					</b-col>
				</b-row> 
				<b-row>
			        <div class="error"> 
			        	<span v-if="error"> {{ proper_label }}: [ </span>
			        		{{ input_validator }} 
			        	<span v-if="error"> ] </span>
			    	</div>
				</b-row>
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator"
	import { Validator }  from "@/assets/Validator"
	import { Response } from "@/assets/Enum"

	let valid = Validator.getInstance

	@Component
	export default class Field extends Vue {
		@Prop({ default: '9999999' }) maxlen!: string
		@Prop({ default: '0' }) minlen!: string
		@Prop(String) required!: string
		@Prop(String) type!: string
		@Prop(String) id!:string
		@Prop(String) label!: string
		@Prop(String) name!: string

		inp_val: string = ""
		spin: boolean = false
		show_icon: boolean = false
		prefix: string = 'far'
		proper_label: any = ''
		status:any = ["far", ""]
		error: boolean = true

		get input_validator () {
			this.show_icon = true
			this.status[1] = "snowflake"
			this.spin = true

			if(this.required) {
				if(valid.isEmpty(this.inp_val)) {
					this.status[1] = "times-circle"
					this.spin = false
					this.error = true
					return Response.empty
				}
			}

			if(this.type == "text") {
				let size_validation:any = valid.checkSize(this.inp_val, +this.maxlen, +this.minlen)
				if(!size_validation.pass) {
					this.status[1] = "times-circle"
					this.spin = false
					this.error = true
					return size_validation.response
				}
			}

			this.validated_data()
		}

		get c_label () {
			if(!valid.isEmpty(this.label)) 
				return this.label.charAt(0).toUpperCase() + this.label.slice(1, this.label.length)
		}

		validated_data () {
			this.status[1] = "check-circle"
			this.spin = false
			this.error = false
			return ""
		}	

		mounted () {
			this.proper_label = this.c_label
		}
	}
</script>

<style lang="scss" >
	$error: red;
	$correct: green;
	$loader: gray;

	.container-fluid {
		.row {
			&.input-group {
				padding: 1rem 1rem 0 1rem;
				label {
					font-weight: bold;
				}
			}
		}
		.error {
			padding: 0.5rem;
			color: $error;
			height: 40px;
		}
		.req { color: $error; }

		svg {
			text-shadow: 1px 1px 1px #ccc;
			font-size: 1.5em;
			&[data-icon=check-circle] {
				color: $correct;
			}
			&[data-icon=snowflake] {
				color: $loader;
			}
			&[data-icon=times-circle] {
				color:  $error;
			}
		}

		.col-1 {
			padding: 0.1em;
		}
	}
</style>

