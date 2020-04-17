class MyPoint {
    constructor(vec) {
        this.vec = vec;
        this.infected = false;
        this.infectionTimer = T_INFECTION;
        this.immune = false;
        this.dx = random(speed/10, speed); // 0.01 ... 0.1
        this.dy = random(speed/10, speed); 

        if (random() * 10 > 5){
            this.dx *= -1;
        }

        if (random() * 10 > 5){
            this.dy *= -1;
        }
    }

    setSpeed(spd) {
        this.dx *= spd;
        this.dy *= spd;
    }

    getSpeed() {
        return [this.dx, this.dy];
    }

    setInfected() {
        
        if(this.immune == false) {
            this.infected = true;
        }
    }

    getIntesity() {
        /*  
        */
        return Math.floor((this.infectionTimer / (T_INFECTION / 100.0)) * 2.55)
    }

    run() {
        var nextX;
        var nextY;
        /* erstma die nächste position berechnen... */
        nextX = this.vec.x + 1 * deltaTime * this.dx;
        nextY = this.vec.y + 1 * deltaTime * this.dy;

        /* wenn links oder rechts raus, x-Richtung umkehren. */
        if ((nextX < radius_point) || (nextX > width - radius_point - B_COLUMN)) {
            this.dx *= -1;
        }

        this.vec.x = this.vec.x + 1 * deltaTime * this.dx; // jetzt nochmal nächste x-Pos
        
        /* wenn oben oder unten raus, y-Richtung umkehren. */
        if ((nextY < radius_point) || (nextY > height - radius_point)){
            this.dy *= -1;
        }

        
        this.vec.y = this.vec.y + 1 * deltaTime * this.dy; // jetzt nochmal nächste y-Pos

        /* Infizierte werden immer weniger infektioes. */
        if (this.infected) {
            this.infectionTimer -= 1;
        }

        /* Infektion überstanden, wir sind immun... */
        if (this.infectionTimer <= 0) {
            this.immune = true;
            this.infected = false;
        }
    }
}