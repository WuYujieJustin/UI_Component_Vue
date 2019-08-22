import Vue from 'vue'

export function labelComponent(component, eventName) {
    return Vue.component('my-component', {
        inheritAttrs: false,
        model: {
            prop: 'options',
            event: eventName || 'input'
        },
        props: {
            //v-model绑定options
            options: {
                type: Object,
                required: true
            },
            labelWidth: {
                type: String,

            },
            labelText: {
                type: String,
            },
            labelId: {
                type: String,

            },
            labelClass: {
                type: String,

            },
            controlWidth: {
                type: String,

            },
            controlHeight: {
                type: String,

            },
            controlIcon: {
                type: String,

            },
            controlIcontext: {
                type: String,

            },
            controlPlaceholder: {
                type: String,

            },
            controlMultiple: {
                type: Boolean,
                default: false
            },
            controlType: {
                type: String,

            },
            controlDateRange: {
                type: Boolean,

            },
            controlPrecision: {
                type: Number,

            },
            controlIsgroupseparator: {
                type: Boolean,
                default: false
            },
            controlFormat: {
                type: String,
                default: "yyyy-MM-dd HH:mm"
            },
            controlReadonly: {
                type: Boolean,
                // default:false
            },
            dataColumns: {
                type: String,

            },
            dataSources: {
                type: Array,
                default: function () {
                    return []
                }
            },
            dataUrl: {
                type: String,

            },
            dataType: {
                type: String,

            },
            dataDisplayfield: {
                type: String,
                default: "text"
            },
            dataAttach: {
                type: String,

            },
            controlNumberRange:{
                type:Boolean
            }

        },
        methods: {

        },
        computed: {
            inputListeners: function () {
                var vm = this;
                // `Object.assign` 将所有的对象合并为一个新对象
                return Object.assign(
                    {},
                    // 我们从父级添加所有的监听器
                    this.$listeners,
                    // 然后我们添加自定义监听器,
                    // 或覆写一些监听器的行为
                    {
                        // 这里确保组件配合 `v-model` 的工作
                        input: function (event) {
                            
                            vm.$emit("input", event.target.value);
                        }
                    }
                );
            }
        },
        mounted() {
            // console.log("this.options", JSON.parse(JSON.stringify(this.options)))
            if (!this.options.hasOwnProperty('value')) {
                console.log("v-model 绑定的对象中必须有'value'属性")
                return
            }
            // console.log(`顶层组件内部接收的$attrs:`);
            // console.log(this.$attrs);
            // console.log(`顶层组件内部接收的$listeners:`);
            // console.log(this.$listeners); // 父级添加的所有属性都在这里
        },
        render(h) {
            var self = this
            return h('div', {
                // 普通的 HTML 特性
                attrs: {
                    class: 'form-group'
                },
                // 与 `v-bind:style` 的 API 相同，
                // 接受一个字符串、对象，或对象组成的数组
                style: {
                    width: this.controlWidth ||'500px',
                    // minWidth: "600px"
                },
            }, [
                    h('label',
                        {
                            // 与 `v-bind:style` 的 API 相同，
                            // 接受一个字符串、对象，或对象组成的数组
                            style: {
                                width: this.labelText?(this.labelWidth || '90px'):0,
                            },
                            attrs: {
                                // class: this.labelClass
                                class: 'control-label',
                            },
                            on:{
                                click(event){
                                    // console.log("this.$refs",self.$refs)
                                    // console.log("self.$refs.component.$refs.input",self.$refs.component.$refs.input)
                                    self.$refs.component.$refs.input.focus()
                                },
                                mousedown(event){
                                    event.preventDefault();
                                }
                            }
                        },
                        [this.labelText]),
                    // h(operator,
                    //     {
                    //         props: {
                    //             isShow: this.options.operator.isShow,
                    //             value: this.options.operatorValue
                    //         },
                    //         on: {
                    //             input: function (data) {
                    //                 console.log("data", data)
                    //                 self.value.operatorValue = JSON.parse(JSON.stringify(data))
                    //             }
                    //         }
                    //     }, []),
                    h(component,
                        {
                            ref:'component',
                            props: {
                                value: this.options.value,
                                lists: this.dataSources,
                                options: this.dataSources,
                                multi: this.controlMultiple,
                                required: this.options.required,
                                readonly: this.controlReadonly  || this.options.locked,
                                placeholder: this.controlPlaceholder,
                                displayField: this.dataDisplayfield,
                                colNames: this.dataColumns,
                                height: this.controlHeight,
                                width: this.controlWidth,
                                type: this.controlType,
                                format: this.controlFormat,
                                daterange: this.controlDateRange,
                                isFormat: this.controlIsgroupseparator,
                                precision: this.controlPrecision,
                                icon:this.controlIcon,
                                icontext:this.controlIcontext,
                                numberrange:this.controlNumberRange
                            },

                            on: {
                                inputListeners: this.$listeners,
                                input: function (data) {
                                    // console.log("self",self)
                                    var data = JSON.parse(JSON.stringify(data))
                                    // console.log("test",data);
                                    // console.log("input事件传到父组件的值",data,typeof(data))

                                    // if (Array.isArray(self.options.value) && Array.isArray(data)) {
                                    //     if (!self.controlMultiple) {
                                    //         self.options.value.pop()
                                    //         self.options.value.push(data[0])
                                    //     } else {
                                    //         for (let i = 0; i < data.length; i++) {
                                    //             self.options.value[i] = data[i]
                                    //         }
                                    //     }
                                    // } else {
                                    //     self.options.value = data
                                    // }
                                    self.options.value = data
                                },
                            }
                        }, [])
                ])
        }
    })
}