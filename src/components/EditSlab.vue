<template>
    <div class="ui pusher">
        <form class="ui form"  style="min-width: 480px" v-on:submit.prevent="save">
            <div class="field">
                <label>Name</label>
                <input type="text" name="slab-name" placeholder="Slab Name" v-model="eslab.name">
            </div>
            <div class="field">
                <label>Description</label>
                <textarea rows="3" v-model="eslab.description" ></textarea>
            </div>
            <button class="ui right floated button" v-on:click.prevent="$emit('returnto-slab')" >Cancel</button>
            <button class="ui right floated positive button" type="submit" >Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditSlabContent',
  props: ['slab'],
  data() {
    return {
      eslab: { name: "", description: "" }
    }
  },
  created() {
    console.log("creating ES")
    this.eslab = Object.assign( {}, this.slab)
  },
  methods: {
    save: async function(evt) {
      try {
        evt.preventDefault()
        const response = await axios.put(
          this.$apihost + '/slab/'+ this.slab._id, this.eslab)
        this.$emit('navto-slab', this.slab._id)
      } catch (err) {
        console.log(err)
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.field {
      margin: 15px 0px !important;
  }
</style>
