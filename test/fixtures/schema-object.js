export default {
  attributes: {
    name: String,
    isJane: Boolean
  },
  options: {timestamps: true},
  virtuals: {
    hello: {
      get() {
        return `Hello ${this.name}`
      },

      set(value) {
        this.name = value.split(" ")[1]
      }
    }
  },
  paths: {
    name: {
      validate: [
        [function (value) {
          return name !== 'John'
        }, 'we hate john']
      ]
    }
  },
  hooks: {
    pre: {
      save: [
        function (next) {
          if (this.isNew && this.name === 'Jane') {
            this.isJane = true
          }

          next()
        }
      ]
    }
  },
  methods: {
    greet() {
      return this.hello
    }
  },
  statics: {
    test() {
      return 'test'
    }
  },
  plugins: [
    [function (schema, options) {
      schema.add({
        plugin: {
          type: String,
          default: options.default
        }
      })
    }, {
      default: 'test'
    }],
    function (schema, options) {}
  ],
  indexes: [
    [{name: 1}, {unique: true}]
  ]
}
