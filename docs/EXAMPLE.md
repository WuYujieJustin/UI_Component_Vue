# VUE前端控件使用方法
## 1. 文本控件
	<i-input-text 
	v-modle="value"
	label="label文本"
	label-color="颜色值（十六进制；RGB……）"
	label-font-size="13"
	placeholder="定义placeholder内容"
	readonly="true"
	prefix-icon="前缀图标"
	suffix-icon="后缀图标"
	@change=""
	@keyup=""
	@keydown=""
	@focus=""
	/>
	<script>
	import IInputText from '~/components/IInputText.vue'
	export default {
	  components: {
	    IInputText
	  }
	  data() {
	    return {
	      value: ''
	    }
	  }
	}
	</script>
## 2.大文本控件
	<i-input-textarea 
	v-modle="value"
	label="label文本"
	label-color="颜色值（十六进制；RGB……）"
	label-font-size="13"
	placeholder="定义placeholder内容"
	readonly="true"
	cols="Number"
	rows="Number"
	@change=""
	@keyup=""
	@keydown=""
	@focus=""
	/>
	<script>
	import IInputTextarea from '~/components/IInputTextarea'
	export default {
	  components: {
	    IInputTextarea
	  }
	  data() {
	    return {
	      value: ''
	    }
	  }
	}
	</script>
## 3数字控件
	<i-input-number 
	v-modle="value"
	label="label文本"
	label-color="颜色值（十六进制；RGB……）"
	label-font-size="13"
	placeholder="定义placeholder内容"
	readonly="true"
	小数点位数="2"
	是否显示千位分隔符="true"
	prefix-icon="前缀图标"
	suffix-icon="后缀图标"
	单位="text"
	@change=""
	@keyup=""
	@keydown=""
	@focus=""
	/>
	<script>
	import IInputNumber from '~/components/IInputNumber'
	export default {
	  components: {
	    IInputNumber
	  }
	  data() {
	    return {
	      value: ''
	    }
	  }
	}
	</script>
## 4下拉选择控件
	<i-input-select 
	v-modle="value"
	label="label文本"
	label-color="颜色值（十六进制；RGB……）"
	label-font-size="13"
	placeholder="定义placeholder内容"
	readonly="true"
	multi="ture"
	:data="{{json}}"
	:data-url="url"
	@change=""
	@select="" 
	/>
	<script>
	import IInputSelect from '~/components/IInputSelect'
	var url=""
	export default {
	  components: {
	    IInputSelect
	  }
	  data() {
	    return {
	      options: [{
	    value:"选项",
	    label:"XXX"
	    },{
	    ……
	    }
	    ]
	    }
	  }
	}
	</script>
## 5下拉列表控件
	<i-input-selectlist
	v-modle="value"
	label="label文本"
	label-color="颜色值（十六进制；RGB……）"
	label-font-size="13"
	placeholder="定义placeholder内容"
	readonly="true"
	multi="ture"
	:data="{{json}}"
	:data-url="url"
	@change=""
	@select=""
	@input=""
	@keydown=""
	@keyup=""
	/>
	<script>
	import IInputSelectList from '~/components/IInputSelectList'
	var url=""
	export default {
	  components: {
	    IInputSelectList
	  }
	  data() {
	    return {
	      options: [{
	    value:"选项",
	    label:"XXX"
	    },{
	    ……
	    }
	    ]
	    }
	  }
	}
	</script>
## 6日期时间控件
	<i-input-date 
	v-modle="value"
	format="dd/MM/yyyy"
	type="year"     //"['year','month','date','datetime','time']"
	label="label文本"
	label-color="颜色值（十六进制；RGB……）"
	label-font-size="13"
	placeholder="定义placeholder内容"
	readonly="true"
	is-range="ture"
	@change=""
	@focus=""
	@input=""
	@keydown=""
	@keyup=""
	/>
	<script>
	import IInputDate from '~/components/IInputDate'
	export default {
	  components: {
	    IInputDate
	  }
	  data() {
	    return {
	      value: ""
	    }
	  }
	}
	</script>
## 7查询列表控件
### 7-1查询控件
	<i-input-search
	v-for = "item in searchlists"
	:key = "item.index"
	/>
	<script>
	import IInputSearch from '~/components/IInputSearch'
	export default {
	  components: {
	    IInputSearch
	  }
	  data() {
	    return {
	      searchlists: [{
	    label:"编号",
	    operator:true,
	    type:"['text','textarea','number','select','selectlist','date']"
	    options:{
	        //不同类型设置参数不同
	        }
	    },
	    {
	    ……
	    }
	    ]
	    }
	  }
	}
	</script>
### 7-2列表控件
	<i-table 
	showordercol="true"
	showsumcol="true"
	needpaging="true"
	numsperpage="10"
	showbasebutton="ture"
	cols="10">
	    <thead>
	        <tr><th v-for = "thead in theads"><th></tr>
	    </thead>
	    <tbody>
	        <tr v-for="tbody in tbodys" :key="tbody.index">
	            <td></td>//列数等于cols
	        </tr>
	    </tbody>
	</i-table>
	<script>
	import ITable from '~/components/ITable'
	export default {
	  components: {
	    ITable
	  }
	  data() {
	    return {
	      table:{
	    thead:['A','B','C','D','E','F'],
	    tbody:[{json}]
	    }
	  }
	}
	</script>
## 8快输控件
	<i-input-quick 
	    v-for="head in heads"
	    rows="10"
	/>
	<script>
	import IInputQucik from '~/components/IInputQucik'
	export default {
	  components: {
	    IInputQucik
	  }
	  data() {
	    return {
	      heads:['A','B','C','D','E','F'],
	    tbody:[{json}]
	    }
	    options:[{
	        //不同类型设置参数不同
	        }]
	  }
	}
	</script>