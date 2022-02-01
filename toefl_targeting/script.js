function myFunction() {
    const sheet = SpreadsheetApp.openById("1OoTlmrNOyrxIVEA0AAEW6MEjyFYipHuYYlIyBLjJd6Q").getActiveSheet();
    const {issue_list, todo_list} = get_sheet_value(sheet);
    const blocks = create_blocks(issue_list, todo_list);
    const options = set_slack_message(blocks);
    post_message_to_salck(options);
}

function get_sheet_value(sheet) {
    const issue_list = [];
    const todo_list = [];
    for(let column = 3; column <= 6; column++) {
        const issue = sheet.getRange("C" + column).getValue();
        const todo = sheet.getRange("D" + column).getValue();
        issue_list.push(issue);
        todo_list.push(todo);
    }
    return {issue_list, todo_list}
}

function create_blocks(issue_list, todo_list) {
    blocks = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Reading*\n:star::star::star: \nIsuue：\n"+ issue_list[0] + '\nToDo：\n' + todo_list[0]
			},
			"accessory": {
			    "type": "image",
				"image_url": "https://www.ets.org/s/toefl/free-practice/htmlImages/displayIcon_Julian_s_picture_76551_1.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Listening*\n:star::star::star::star: \nIsuue：\n"+ issue_list[1] + '\nToDo：\n' + todo_list[1]
			},
			"accessory": {
				"type": "image",
				"image_url": "https://images.theconversation.com/files/361577/original/file-20201005-18-lmf7w7.jpg?ixlib=rb-1.1.0&rect=142%2C16%2C5464%2C3715&q=45&auto=format&w=926&fit=clip",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Writing*\n:star::star::star: \nIsuue：\n"+ issue_list[2] + '\nToDo：\n' + todo_list[2]
			},
			"accessory": {
				"type": "image",
				"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9Eia6gkUNGedVLw1kUga_4S-tMIWKBSuyg&usqp=CAU",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Speaking*\n:star::star: \nIsuue：\n"+ issue_list[3] + '\nToDo：\n' + todo_list[3]
			},
			"accessory": {
				"type": "image",
				"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREjU9KVNJPQVpj9rB3NEC17asNXqbMZ-WxMw&usqp=CAU",
				"alt_text": "alt text for image"
			}
		}
	];
    return blocks;
}

function set_slack_message(blocks) {
    const message = "test";
    const block = blocks
    let payload = {
        "text" : message,
        "blocks": block,
        "username": "TOEFL目標",
        "icon_emoji": ":headstone:"
    };
    payload = JSON.stringify(payload);

    const options = {
        "method" : "post",
        "muteHttpExceptions" : true,
        "contentType" : "application/json",
        "payload" : payload,
    };
    return options;
}

function post_message_to_salck(options) {
    const prop = PropertiesService.getScriptProperties().getProperties();
    const WEBHOOK_URL = prop.WEBHOOK_URL;
    const res_from_slack = UrlFetchApp.fetch(WEBHOOK_URL, options);
    return res_from_slack;
}