chrome.tabs.getSelected(null, function(tab) {
    let url = tab.url.split('?')[0]
    // AmazonのURLじゃない時は何もせずに注意書きを表示する
    if (!url.match(/amazon.co.jp/)) {
        let message = document.getElementById('message')
        message.innerText = 'Amazonの商品ページでご利用ください'
        return
    }
    // gp/product など色々な形式のURLがあるので最もシンプルな dp に統一
    const replacedUrl = url.replace(/\/gp\/product\/|\/exec\/obidos\/ASIN\/|\/o\/ASIN\/|\/exec\//g, '/dp/')
    const parsedUrl = replacedUrl.split('/');
    let newUrl = ''
    // URLを細分化して不要な項目を除いていく
    for (let index in parsedUrl) {
        // 日本語がエンコードされて長くなってしまうところはURLに含めない
        if (parsedUrl[index-1] && parsedUrl[index-1].match(/amazon.co.jp/)) {
            if (parsedUrl[index] !== 'dp') {
                continue
            }
        }
        // 最後に ref= ~ と付く部分も不要なので含めない
        if (parsedUrl[index].match('ref=')) {
            continue
        }
        newUrl += parsedUrl[index] + '/'
    }

    // 最後にアフィリエイトタグをくっつけてURLを作る
    let affiliateTag = ''
    if (localStorage['amazonLinkAffiliateTag']) {
        affiliateTag = localStorage['amazonLinkAffiliateTag']
    }
    newUrl = newUrl.slice(0, -1) + affiliateTag
    window.open(newUrl)
})