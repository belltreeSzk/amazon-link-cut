// 保存ボタンを押したときの動き
const save = document.getElementById('save')
save.addEventListener('click', function () {
    let message = document.getElementById('message')
    localStorage['amazonLinkAffiliateTag'] = message.value
}, false)

// 既に登録済みなら登録しているタグを表示する
if (localStorage['amazonLinkAffiliateTag']) {
    let message = document.getElementById('message')
    message.value = localStorage['amazonLinkAffiliateTag']
}