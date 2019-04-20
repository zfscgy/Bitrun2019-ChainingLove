// 用户设置昵称 传入参数
var set_name_data = 
{
    "new_name": "新的昵称"
}
// 用户设置昵称 响应数据
var set_name_resp = 
{
    "status": "成功：ok，不成功: fail",
    "msg": "备注"
}
// 用户获取昵称 传入参数（可以获取别的用户的昵称，如果知道用户名）
var get_name_data = 
{
    "account_name": "注册时的地址"
}
// 用户获取昵称 响应数据
var get_name_resp = 
{
    "status": "成功：ok, 不成功：fail",
    "name": "成功：用户的昵称",
    "msg": "备注"
}
// 用户记录 传入参数
var write_memory_data = 
{
    "account_name": "用户名",
    "partners": ["用户名", "参加该活动的别的账户的用户名"],
    "desc": "事件的描述信息"
}
// 用户记录 返回参数
var write_memory_resp = 
{
    "status": "成功 ok, 不成功：fail",
    "msg": "备注"
}
// 获取用户时间线
var get_timeline_data = 
{
    "account": "用户名",
    "lover": "用户情侣地址",
    "friends": "用户的朋友地址",
    "moments": 
    [{
        "time": "活动时间",
        "partners": ["用户名", "参与该活动的别的账户的用户名"],
        "desc": "活动描述"
    },
    {
        "time": "活动时间",
        "partners": ["用户名", "参与该活动的别的账户的用户名"],
        "desc": "活动描述"
    }]
}
// 获取他人向自己发起的活动申请
var get_proposal_data = 
{
    "proposals":
    [
        {
            "id": "id",
            "type": "类型（startLove, normal, breakUp(分手)）",
            "proposer": "发起人",
            "confirmations": ["参与者1是否同意", "参与者2是否同意"],
            // 总共有 waiting, accepted, rejected 三种状态
            "activity":
            {
                "time": "活动时间",
                "partners": ["用户名", "参与该活动的别的账户的用户名"],
                "desc": "活动描述"
            }
        },
        {
            "id": "id",
            "type": "类型（startLove, normal, breakUp(分手)）",
            "proposer": "发起人",
            "confirmations": ["参与者1是否同意", "参与者2是否同意"],
            // 总共有 waiting, accepted, rejected 三种状态
            "activity":
            {
                "time": "活动时间",
                "partners": ["用户名", "参与该活动的别的账户的用户名"],
                "desc": "活动描述"
            }
        }
    ]
}
var confirm_proposal_data = 
{
    "id": "proposal_id",
    "confirm": "可以是accept 或者 reject"
}