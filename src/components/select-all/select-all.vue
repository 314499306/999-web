<template>
  <v-select
    v-model="selectValue"
    :items="items"
    label="Favorite Fruits"
	:item-text="itemText"
	:item-value="itemValue"
	return-object
    multiple
  >
    <template v-slot:prepend-item>
      <v-list-tile
        ripple
        @click="toggle"
      >
        <v-list-tile-action>
          <v-icon :color="selectValue.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:append-item>
      <v-divider class="mb-2"></v-divider>
      <v-list-tile disabled>
        <v-list-tile-avatar color="grey lighten-3">
          <v-icon>mdi-food-apple</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content v-if="likesAllFruit">
          <v-list-tile-title>Holy smokes, someone call the fruit police!</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-content v-else-if="likesSomeFruit">
          <v-list-tile-title>Fruit Count</v-list-tile-title>
          <v-list-tile-sub-title>{{ selectValue.length }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-content v-else>
          <v-list-tile-title>
            How could you not like fruit?
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Go ahead, make a selection above!
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-select>
</template>

<script>
  export default {
    data: () => ({
      
    }),
	props:{
		value: {
			type:Array,
			default:() => []
		},
		items: {
			type: Array,
			default:() => []
		},
		itemText: {
			type: String,
			default:() => 'name'
		},
		itemValue: {
			type: String,
			default:() => 'code'
		}
	},
    computed: {
      likesAllFruit () {
        return this.selectValue.length === this.items.length
      },
      likesSomeFruit () {
        return this.selectValue.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      }, 
      selectValue: {
		set(val){
			this.$emit('input', val)
			this.$emit("change", val)
		},
        get(){
          return this.value
        }
	  }
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.selectValue = []
          } else {
            this.selectValue = this.items.slice()
          }
        })
      }
    }
  }
</script>

<style>
</style>
