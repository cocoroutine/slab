<template>
    <div id="content">
        <Sidebar v-bind:slab="slab"
                 v-bind:table="table"
                 v-bind:tableList="tableList"
                 v-on:navto-slab="slabRoute"
                 v-on:navto-table="tableRoute" />

        <component v-bind:is="pcomponent"
                   v-bind:columnId="columnId"
                   v-bind:menuColumns="menuColumns"
                   v-bind:masterSlab="masterSlab"
                   v-bind:masterColumns="masterTableRef"
                   v-bind:slab="slab"
                   v-bind:table="table"
                   v-bind:tableList="tableList"
                   v-on:edit-column="editColumnMode"
                   v-on:edit-slab="editMode"
                   v-on:edit-table="editTableMode"
                   v-on:navto-slab="slabRoute"
                   v-on:navto-table="tableRoute"
                   v-on:read-master="slabMasterRead"
                   v-on:read-slab="slabRead"
                   v-on:read-table="tableRead"
                   v-on:returnto-slab="slabMode"
                   v-on:returnto-table="tableMode"
                   />
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

import EditColumnContent from '@/components/EditColumn.vue'
import EditSlabContent from '@/components/EditSlab.vue'
import EditTableContent from '@/components/EditTable.vue'
import SlabContent from '@/components/Slab.vue'
import Sidebar from '@/components/Sidebar.vue'
import TableContent from '@/components/Table.vue'

export default {
  name: 'SlabPage',
  props: ['pageComponent'],
  components: {
    EditColumnContent,
    EditSlabContent,
    EditTableContent,
    Sidebar,
    SlabContent,
    TableContent
  },
  data() {
    return {
      columnId: null,
      masterSlab: { _id: "", tables:[] },
      masterTableRef: {},
      menuColumns: {},
      pcomponent: "SlabContent",
      slab: { _id: "", name: "", description: ""},
      table: { _id: "", friendly: "", name: "", description: "", joins: [] },
      tableList: [],
    }
  },
  created() {
    console.log("creating SP")
    if(this.pageComponent) {
      this.pcomponent = this.pageComponent
    }
  },
  methods: {
    editMode: function() {
      this.pcomponent = "EditSlabContent"
    },
    editColumnMode: function(colId) {
      console.log("edit column" + colId)
      this.columnId = colId
      this.pcomponent = "EditColumnContent"
    },
    editTableMode: function() {
      console.log("edit table")
      this.pcomponent = "EditTableContent"
    },
    slabMode: function() {
      console.log("slab mode")
      this.pcomponent = "EditTableContent"
      this.pcomponent = "SlabContent"
    },
    tableMode: function() {
      console.log("table mode")
      this.pcomponent = "TableContent"
    },
    slabMasterRead: async function() {
      console.log("read master")
      try {
        const response = await axios.get(this.$apihost + '/slab/master')
        this.masterSlab = response.data

        // create a master table ref for diffs
        let mtr = {}
        this.masterSlab.tables.map( function(table) {
          mtr[table.name] = {}
          table.columns.map( function(col) {
            mtr[table.name][col.name] = {}
            Object.assign(mtr[table.name][col.name], { ...col })
          })
        })
        this.masterTableRef = mtr
      } catch (err) {
        console.log(err)
      }
    },
    slabRead: async function(slabId) {
      console.log("read slab")
      try {
        const response = await axios.get(this.$apihost + '/slab/' + slabId)
        this.slab = response.data
        this.tableList = this.slab.tables 
      } catch (err) {
        console.log(err)
      }
    },
    slabRoute: async function(slabId) {
      let sid = slabId
      //user master if null
      if(!sid) {
        await this.slabMasterRead()
        sid = this.masterSlab._id
      }

      await this.slabRead(sid)
      this.slabMode()

      console.log("route slab")
      this.$router.push({
        name: 'SlabPage',
        params: { id: sid }
      })
    },
    tableRead: async function(tableId) {
      console.log("read table")
      try {
        const response = await axios.get(this.$apihost + '/table/'+ tableId)
        this.table = response.data
        //update slab as well
        await this.slabRead(this.table._slabId)

        // populate menu columns
        let menuCols = {}
        menuCols[this.table._id] = this.table.columns
        this.table.joins.map( join => menuCols[join._id] = join.columns )
        this.menuColumns = menuCols

      } catch (err) {
        console.log(err)
      }
    },
    tableRoute: async function(tableId) {
      await this.tableRead(tableId)
      this.tableMode()

      console.log("route table")
      this.$router.push({
        name: 'TablePage',
        params: { id: tableId }
      })
    },
  }
}
</script>
