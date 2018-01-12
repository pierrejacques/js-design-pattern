const googleMap = {
    show() {
        console.log('from Google Map');
    }
};

const baiduMap = {
    display() {
        console.log('from Baidu Map');
    }
};

const renderMap = map => map.show();

const b2gAdapter = map => ({
    show() {
        map.display();
    }
});

const baiduMapAdapted = b2gAdapter(baiduMap);
renderMap(googleMap);
renderMap(baiduMapAdapted);
