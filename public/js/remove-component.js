AFRAME.registerComponent('remove-component', {
    schema: {},
    init : function() {
        const Context_AF = this;

        //get the sound
        Context_AF.soundElem = document.querySelector('#deleteSound');

        Context_AF.el.addEventListener('click', function(event) {
            console.log("click");
            //object clicked delete CocaCola can!
            Context_AF.deleteCokeCan();

            //we stop the sound so it dosent overlap and play multiple at the same time
            Context_AF.soundElem.components['sound'].stopSound();
            //play the sound when Context_AF is deleted
            Context_AF.soundElem.components['sound'].playSound();
        });
    },
    deleteCokeCan : function() {
        const Context_AF = this;
        Context_AF.el.parentNode.removeChild(Context_AF.el);
    }
});