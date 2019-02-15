AFRAME.registerComponent('create-obj-component', {
    schema: {},
    init : function() {
        const Context_AF = this;
        Context_AF.soundElem = document.querySelector('#createSound');

        Context_AF.el.addEventListener('click', function(event) {
            console.log("click");
            //object clicked create ItemName
            Context_AF.createItem();
            
            //stop the sound first so we aren't trying to play more than one at same time
            Context_AF.soundElem.components['sound'].stopSound();
            // play the sound
            Context_AF.soundElem.components['sound'].playSound();
        });
    },
    createItem : function() {
        const Context_AF = this;

        let ItemNameElem = document.createElement('a-entity');
        ItemNameElem.setAttribute('obj-model', {obj:'/assets/models/createObj.obj'});
        ItemNameElem.setAttribute('material', {src:'/assets/textures/createObj_texture.png'});
        ItemNameElem.setAttribute('remove-component', {});
        var x = Math.floor((Math.random() * -5) - 2);
        var z = Math.floor((Math.random() * -4) - 1);
        ItemNameElem.setAttribute('position', {x, y:0, z});
        
        let scene = document.querySelector('a-scene');
        scene.appendChild(ItemNameElem);
    }
});