<template>
  <div class="home">
    <img src="../assets/logo.png">
    <br/>
    <b-row>
      <b-col cols="4">
        <b-container>
          <b-row>
            <b-col cols="12">
              <div class="ins">
                <h4>Installation npm :</h4>
                <pre>
                  <code> 
                    npm i --save @try-parser/fte-helper
                  </code>
                </pre>
              </div>
            </b-col>
          </b-row>          
          <b-row>
            <b-col cols="12">
              <div class="ins">
                <h4>Usage :</h4>
                <pre> 
                  import Vue from 'vue'
                  import Components from '@try-parser/fte-helper'

                  Vue.use(Components)
                </pre>
              </div>
            </b-col>
          </b-row>          
          <b-row>
            <b-col cols="12">
              <div class="ins">
                <h4>Repository :</h4>
                <pre> 
                  https://github.com/Try-Parser/fte-helper.git
                </pre>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <div class="ins">
                <h4>Message to our world Savior :</h4>
                <pre>
                  
                  Please feel free to contribute if you 
                  have some cool stuff ask me and ill let you in.
                </pre>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    	<b-col cols="4">
        <b-container>
      		<b-row>
            <b-col cols="12">
              <fieldset>
                <legend>Sample Form:</legend>
                <Form @form-data='submitted'>	
            			<Field type="text" required="true" label="sample" name="sample" maxlen="5" minlen="1" />
            			<Field type="text" required="true" label="sample2" name="sample2" maxlen="5" minlen="1" />
          			</Form >
              </fieldset>
            </b-col>	
          </b-row>
          <br>
          <b-row>
            <h5>Html Code:</h5>
            <b-col cols="12">
              <pre>
  &lt;Form @form-data='submitted'&gt;
  &lt;Field type="text" required="true" label="sample" name="sample" maxlen="5" minlen="1" /&gt;
    &lt;Field type="text" required="true" label="sample2" name="sample2" maxlen="5" minlen="1" /&gt;
  &lt;/Form /&gt;
              </pre>
            </b-col>
          </b-row>   
          <br>      
          <b-row>
            <h5>Vue Code:</h5>
            <b-col cols="12">
              <pre>
submitted(evt) {
  console.log(evt.data)
  this.display = JSON.stringify(evt, undefined, 2)
  this.data = JSON.stringify(evt.data, undefined, 2)
  this.error = JSON.stringify(evt.error_field, undefined, 2)
}
              </pre>
            </b-col>
          </b-row>
        </b-container>
  		</b-col>    	
  		<b-col cols="4">
  			<b-container>
  				<b-row>
  					<b-col class="result">
              <b>Response : </b>
  						<pre>{{ display }}</pre>
              <b>Response Result : </b>
  						<pre>{{ data }}</pre>
              <b>Response Error : </b>
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
    console.log(evt.data)
		this.display = JSON.stringify(evt, undefined, 2)
		this.data = JSON.stringify(evt.data, undefined, 2)
		this.error = JSON.stringify(evt.error_field, undefined, 2)
	}
}
</script>

<style lang="scss" scoped>
  .ins {
    text-align: left;
  }

  fieldset {
    border-width: 2px;  
    border-style: groove;
    border-color: threedface;
    border-image: initial;
    legend {
      width: unset;
      text-align: left;
    }
  }

  pre {
    text-align: left;
    margin: unset;
    white-space: pre;
  }
  .result {
    text-align: left;

    pre {
      height: 200px;
      border-radius: 5px;
      background-color: #c3c1c1;
    }
  }
</style>
