<template>
<div class="ui pusher" >
        <div class="masthead">
            <h1 class="ui left floated header">
                <i class="building icon" ></i>
                <div class="content">{{ slab.name }}</div>
            </h1>
            <button class="ui right floated basic circular icon button" v-on:click="$emit('edit-slab')" >
                <i class="edit icon"></i>
            </button>
        </div>
        <div class="item" style="margin-top: 20px; margin-bottom: 40px; min-width: 480px">
            {{ slab.description }}
        </div>
        <template v-if="isMaster === true">
            <div class="ui three column grid" style="min-width: 480px" >
                <div class="column" v-for="table in masterSlab.tables" :key="table._id">
                    <div class="ui small modal" :id="`modal-${table._id}`">
                        <div class="header"> Sync {{ table.friendly }} Table from Master?</div>
                        <div class="content">
                            <p>This will delete the existing {{ table.friendly }} 
                            table and all existing columns associated with it</p>
                        </div>
                        <div class="actions">
                            <div class="ui green positive button" v-on:click="syncTable(table.name)">Sync</div>
                            <div class="ui cancel button">Cancel</div>
                        </div>
                    </div>
                    <div class="ui left labeled button"  style="margin: 10px;">
                        <div class="ui basic label" style="width: 100px">
                            {{ table.friendly }}
                        </div>
                        <div class="ui green button" v-on:click="showModal(table._id)">
                            <i class="check icon"></i> Sync 
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SlabContent',
  props: ['slab', 'masterSlab'],
  created() {
    console.log("creating S")
    if (this.$route.params.id) {
      this.$emit('read-slab', this.$route.params.id)
      this.$emit('read-master')
    } else {
      this.$emit('navto-slab')
    }
  },
  computed: {
    isMaster: function() {
      if (this.slab.master)
        return false
      return true
    }
  },
  methods: {
    showModal: function(tableId) {
      $('#modal-' + tableId).modal('show');
    },
    syncTable: async function(tableName) {
      try {
        const response = await axios.get(
          this.$apihost + '/synco/'+ tableName.trim() + '/' + this.slab._id)
        this.$emit('navto-table', response.data._id)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .masthead {
    display: block;
    height: 80px;
    min-width: 480px;
  }
</style>
