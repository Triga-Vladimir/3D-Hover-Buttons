let calculateAngle = function(e, item, parent) {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`
        if(parent.getAttribute('data-filter-color') !== null) {
            dropShadowColor = parent.getAttribute('data-filter-color');
        }

        let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
        let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

        let halfWidth  = item.getBoundingClientRect().width / 2;
        let halfHeight = item.getBoundingClientRect().height / 2;

        let calcAngleX = (x - halfWidth) / 6;
        let calcAngleY = (y - halfHeight) / 4;

        item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.15)`;
        
        parent.style.perspective = `${halfWidth * 2}px`
        item.style.perspective = `${halfWidth * 3}px`

        if(parent.getAttribute('data-custom-perspective') !== null) {
            parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
        }

        let calcShadowX = (x - halfWidth) / 3;
        let calcShadowY = (y - halfHeight) / 3;
        
        item.style.filter = `drop-shadow(${-calcShadowX}px ${calcShadowY}px 15px ${dropShadowColor})`;
    }

    document.querySelectorAll('.button').forEach(function(item) {
        item.addEventListener('mouseenter', function(e) {
            calculateAngle(e, this.querySelector('span'), this);
        });

        item.addEventListener('mousemove', function(e) {
            calculateAngle(e, this.querySelector('span'), this);
        });

        item.addEventListener('mouseleave', function(e) {
            let dropShadowColor = `rgba(0, 0, 0, 0.3)`
            if(item.getAttribute('data-filter-color') !== null) {
                dropShadowColor = item.getAttribute('data-filter-color')
            }
            item.querySelector('span').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
            item.querySelector('span').style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
        });
    })