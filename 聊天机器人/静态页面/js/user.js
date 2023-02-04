//用户注册和表单验证的通用代码
//对某一个表单项进行验证的构造函数
class FieldValidator{
    /**
     * 构造器
     * @param {String} txtId  文本框id
     * @param {Funcion} validatorFunc  验证规则函数，当需要对该文本框进行验证是，会调用该函数
     */
    constructor(txtId, validatorFunc) {
        this.input = $('#' + txtId)
        this.p = this.input.nextElementSibling
        this.validatorFunc = validatorFunc
        this.input.onblur = () => {
          this.validate()
        }
      }
    /**
     * 验证成功。返回true ，失败返回false
     */
    async validate() {
        const err = await this.validatorFunc(this.input.value)
        if (err) {
          // 有错误
          this.p.innerText = err
          return false;
        } else {
          this.p.innerText = ''
          return true
        }
      }
     /**
   * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
   * @param {FieldValidator[]} validators
   */
     static async validate(...validators) {
        const proms = validators.map((v) => v.validate())
        const results = await Promise.all(proms)
        return results.every((r) => r)
      }
    }
