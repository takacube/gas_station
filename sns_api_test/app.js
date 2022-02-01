function myFunction() {
    const youtube_subscriber = get_youtube_subscribers();
    Logger.log(youtube_subscriber);

    const twitter_follower = get_twitter_followers();
    Logger.log(twitter_follower);

    //const instagram_follower = get_instagram_followers();
    //Logger.log(instagram_follower);

    const message_to_send = set_slack_message(twitter_follower, youtube_subscriber);
    const res_from_slack = post_message_to_salck(message_to_send);
    Logger.log(res_from_slack);
}
//this is the tempt function which can retrieve only rough number
function get_youtube_subscribers() {
    const prop = PropertiesService.getScriptProperties().getProperties();
    const KEY_TO_YOUTUBE = prop.KEY_TO_YOUTUBE;
    const CHANNEL_ID = prop.CHANNEL_ID
    const url_youtube = "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=" + CHANNEL_ID +"&key=" + KEY_TO_YOUTUBE;
    const response_from_youtube = UrlFetchApp.fetch(url_youtube);
    const json_youtube = JSON.parse(response_from_youtube.getContentText());
    return json_youtube["items"][0]["statistics"]["subscriberCount"];
}

function get_twitter_followers() {
    const url_twitter = "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=momo_and_ume";
    const response_from_twitter = UrlFetchApp.fetch(url_twitter);
    const json_twitter = JSON.parse(response_from_twitter.getContentText());
    return json_twitter[0]["followers_count"];
}

function set_slack_message(twitter_follower, youtube_follower) {
    const message = 'ジェラードンのSNSだよ！\n' + 'twitter：' + twitter_follower + '\n' + 'youtube：'+ youtube_follower　+ '\n';
    let payload = {
        "text" : message,
        "username": "ジェラードンSNS",
        "icon_emoji": ":cake:"
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

//function get_instagram_followers(){
    //const prop = PropertiesService.getScriptProperties().getProperties();
    //const INSTA_BUSINESS_ID = prop.INSTA_BUSINESS_ID;
    //const INSTAGRAM_ACCESS_TOKEN = prop.INSTAGRAM_ACCESS_TOKEN;
    //const url_instagram = "https://graph.facebook.com/v12.0/"+ INSTA_BUSINESS_ID +"?fields=business_discovery.username("+"momo_and_ume"+"){followers_count,media_count}&access_token="+ INSTAGRAM_ACCESS_TOKEN;
    //const encoded_url_instagram = encodeURI(url_instagram);
    //const response_from_instagram = UrlFetchApp.fetch(encoded_url_instagram);
    //const json_instagram = JSON.parse(response_from_instagram);
    //return json_instagram["business_discovery"]["followers_count"];
    //return 0;
//}