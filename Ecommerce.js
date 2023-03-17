intent('(open|view) (the|) (card|cart|car.)', p => {
    p.play({command:'open-cart'});
});

intent('(close) (the|) (card|cart|car.)', p => {
    p.play({command:'close-cart'});
});


const quantityContext=context(()=>{
    follow("$(QUANTITY NUMBER)",p=>{
        p.play({command:'add-item',payload:{quantity:p.QUANTITY.number , name:p.state.name}})
        p.resolve()
    })
    
    fallback('Please state how many items you want to add')
})
intent(`add (the|) $(ITEM_NAME Google Pixel Black|Samsung S7|HTC 10 Black|HTC 10 White|HTC Desire 626s|Vintage Iphone|Iphone 7|Smashed Iphone) (item|) to (the|) cart`, p => {
    p.play("How many would you like to add?")
    p.then(quantityContext,{state:{name:p.ITEM_NAME.value}})
});

intent(`remove (the|) $(ITEM_NAME Google Pixel Black|Samsung S7|HTC 10 Black|HTC 10 White|HTC Desire 626s|Vintage Iphone|Iphone 7|Smashed Iphone) (item|) from (the|) cart`, p => {
    p.play({command:'remove-item',payload:{name:p.ITEM_NAME.value}})
});

intent('(checkout|purchase) items',p=>{
    p.play({command:'purchase-items'})
})

intent('(clear|remove) cart',p=>{
    p.play({command:'clear-cart'})
})