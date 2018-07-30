<template>
	<b-form @submit="onSubmit">
		<slot></slot>
		<b-row v-if="!def">	
			<b-col cols="4" offset="8">
				<b-button variant="danger" size="sm" >
					<fa :icon='["far", "times-circle"]' />
					Cancel
				</b-button>
				<b-button variant="success"  size="sm" type="submit">
					<fa :icon='["far", "save"]' />
					Submit
				</b-button>
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
		@Prop(String) def!: string

		data: FormResp = { 
			data: {},  
			error: false,
			error_field: []
		}
		onSubmit (evt) {
			evt.preventDefault()
			this.data.error_field = []
			this.data.data = {}
			for(let child of this.$children) {
				if(child.$options["_componentTag"] === "Field") {
					this.data.data[child["name"]] = child["inp_val"]
					if(child["error"]) {
						this.data.error = true
						this.data.error_field.push(child["name"])
					} else {
						this.data.error = false
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
		margin:5px;
	}
</style>
