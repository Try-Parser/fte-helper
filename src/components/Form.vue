<template>
	<b-form @submit="onSubmit">
		<slot></slot>
		<b-row>	
			<b-col cols="12">
				<b-button variant="success" type="submit">Submit</b-button>
				<b-button variant="danger">Cancel</b-button>
			</b-col>
		</b-row>
	</b-form>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator"
	import { Validator }  from "@/assets/Validator"

	let valid: Validator = Validator.getInstance

	interface FormResp {
		data: {};
		error: boolean;
		error_field: string[];
	}

	@Component
	export default class Form extends Vue {
		data: FormResp = { 
			data: [],  
			error: false,
			error_field: []
		}
		onSubmit (evt) {
			evt.preventDefault()
			this.data.error_field = []
			for(let child of this.$children) {
				if(child.$options["_componentTag"] === "Field") {
					this.data.data[child["name"]] = child["inp_val"]
					if(child["error"]) {
						this.data.error = true
						this.data.error_field.push(child["name"])
					}
				}
			}
			this.$emit('form-data', this.data)
		}
		validate_label () {
			let data:any = []

			for(let child of this.$children) {
				if(!valid.isEmpty(child["name"])) {
					if(!data.includes(child["name"]))
						data.push(child["name"]) 
					else 
						throw new Error('Label duplicate : ' + child["name"])
				} else throw new Error('Name is undefined')
			}
		}
		mounted () {
			this.validate_label()
		}
	}
</script>

<style lang="scss" scoped>
	button {
		margin: 1px;
		float: right
	}
</style>
