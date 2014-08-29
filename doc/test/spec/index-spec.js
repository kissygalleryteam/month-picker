KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('month-picker', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/month-picker/1.0.0/']});