<template>
  <div class="home">
    <img src="../assets/logo.png">
    <br/>
    <b-row>
    	<b-col cols="6">
    		<Form @form-data='submitted'>	
  				<Field type="text" required="true" label="sample" name="sample" maxlen="5" minlen="1" />
  				<Field type="text" required="true" label="sample2" name="sample2" maxlen="5" minlen="1" />
  			</Form >	
  		</b-col>    	
  		<b-col cols="6">
  			<b-container>
  				<b-row>
  					<b-col>
  						<pre>{{ display }}</pre>
  						<pre>{{ data }}</pre>
  						<pre>{{ error }}</pre>
  					</b-col>
  				</b-row>
  			</b-container>
  		</b-col>
  	</b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Field from '@/components/Field.vue';
import Form from '@/components/Form.vue';

@Component({
  components: {
    Field,
    Form
  },
})
export default class Home extends Vue {
	display = "{}"
	data = "{}"
	error = "{}"
	submitted(evt) {
		this.display = JSON.stringify(evt, undefined, 2)
		this.data = JSON.stringify(evt.data, undefined, 2)
		this.error = JSON.stringify(evt.error_field, undefined, 2)
	}
}
</script>

<style type="scss">
	pre {
		text-align: left;
		height: 200px;
		border-radius: 5px;
		background-color: #c3c1c1;
	}
</style>
