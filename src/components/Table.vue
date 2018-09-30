<template>
    <div class="ui pusher" >
        <div class="masthead">
            <h1 class="ui left floated header">
                <i class="database icon" > </i>
                <div class="content">{{ table.friendly }}
                    <div class="sub header">{{ table.name }}</div>
                </div>
            </h1>
            <button class="ui right floated basic circular icon button" v-on:click="tableEditRoute" >
                <i class="edit icon"></i>
            </button>
        </div>
        <div class="item" style="min-width: 480px">
            <Tag v-for="flag in listTableFlags()" :name="flag" :key="flag" />
        </div>
        <div class="item" style="margin-top: 20px; min-width: 480px">
            {{ table.description }}
        </div>
        <div class="ui pointing menu" style="min-width: 320px">
            <a class="item" v-bind:class="{ active: table._id == selectedMenu }"
                v-on:click="selected = table._id" >{{ table.friendly }}</a>
            <template v-if="table.joins">
                <a class="item"
                   v-for="join in table.joins"
                   v-bind:class="{ active: join._id == selectedMenu }"
                   v-on:click="selected= join._id"
                   :key="join._id" >{{ join.friendly }}</a>
            </template>
            <div class="right menu" >
                <div class="item">
                    <div class="ui transparent icon input">
                        <input type="text" placeholder="column name..." ref="addcolumn">
                        <i class="plus link icon" v-on:click="addColumn"></i>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="hasColumns">
            <div class="ui raised segment" style="min-width: 320px">
                <div class="ui fluid divided items">
                    <ColumnContent v-for="column in menuColumns[selectedMenu]"
                                   v-bind:column="column"
                                   v-bind:flags="listColumnFlags(column)"
                                   v-bind:isMaster="slab.master"
                                   v-bind:masterColumns="masterColumns"
                                   v-bind:tableName="table.name"
                                   v-bind:tableId="table._id"
                                   v-on="$listeners"
                                   :key="column._id" />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from 'axios'
import ColumnContent from '@/components/Column.vue'
import Tag from '@/components/Tag.vue'

export default {
  name: 'TableContent',
  components: { ColumnContent, Tag },
  props: ['slab', 'table', 'menuColumns', 'masterColumns'],
  data() {
    return {
      selected: null
    }
  },
  created() {
    console.log("creating T")
    if (this.$route.params.id) {
      this.$emit('read-table', this.$route.params.id)
      this.$emit('read-master')
    } else {
      this.$emit('navto-slab')
    }
  },
  computed: {
    hasColumns: function() {
      if(this.table.columns)
        if(this.table.columns.length)
            return true
      return false
    },
    selectedMenu: function() {
      if(!this.selected)
        return this.table._id
      if(!(this.selected in this.menuColumns))
        return this.table._id
      return this.selected
    },
  },
  methods: {
    addColumn: async function() {
      if (this.$refs.addcolumn.value) {
        let name = this.$refs.addcolumn.value.toLowerCase()
        let dbname = this.$refs.addcolumn.value.toLowerCase()
        let tableId = this.selectedMenu

        let payload = { "friendly": name , "name": dbname, "_tableId": tableId }
        const response = await this.columnCreate(payload)
        this.$refs.addcolumn.value =""
      }
    },
    columnCreate: async function(payload) {
      try {
        const response = await axios.post(this.$apihost + '/column', payload)
        this.menuColumns[this.selectedMenu].push(response.data)
        return response
      } catch (err) {
        console.log(err)
      }
    },
    listColumnFlags: function(col) {
        let flags = []
        if (col.isPK)
            flags.push('isPK')
        if (col.isFK)
            flags.push('isFK')
        if (col.isSegment)
            flags.push('isSegment')
        if (col.isMI)
            flags.push('isMI')
        if (col.isPII)
            flags.push('isPII')
      return flags
    },
    listTableFlags: function() {
        let flags = []
        if (this.table.isSending)
            flags.push('isSending')
        if (this.table.isPrune)
            flags.push('isPrune')
        return flags
    },
    tableEditRoute: function() {
      this.$emit('edit-table')
    },
  }
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
