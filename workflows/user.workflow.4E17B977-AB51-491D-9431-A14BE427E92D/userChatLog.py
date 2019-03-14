# -*- coding:utf-8 -*-
import json,sys,os
from workflow import Workflow, web

reload(sys)
sys.setdefaultencoding('utf-8')

def main(wf):
    userId = os.getenv('userId')
    baseUrl = os.getenv('baseUrl')
    
    data = wf.stored_data('qq_search_user_list')
    for item in data:
        if item['userId'] == userId:
            data = {'userId':userId, 'type':item['type']}
            chatType = item['type']

    url = baseUrl + 'chatlog?userId=' + userId + '&type=' + chatType
    try:
        result = web.get(url=url)
        result.raise_for_status()
        resp = result.text
        userList = json.loads(resp)
        if len(userList) > 0:
            for item in userList:
                title = item['title']
                subtitle = item['subTitle']
                icon = item['icon']
                userId = item['userId']
                qlurl = item['qlurl']
                wf.add_item(title=title, subtitle=subtitle, icon=icon, valid=True, copytext=title, largetext=title, quicklookurl=qlurl, arg=sys.argv[1])
        else:
            wf.add_item(title='找不到联系人…',subtitle='请重新输入')
    except IOError:
                wf.add_item(title='请先启动QQ & 登录…',subtitle='并确保安装QQ小助手')

    wf.send_feedback()
if __name__ == '__main__':
    wf = Workflow()
    sys.exit(wf.run(main))
