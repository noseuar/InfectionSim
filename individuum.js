class MyPoint {
    constructor(vec) {
        this.vec = vec;
        this.infected = false;
        this.infectionTimer = T_INFECTION;
        this.immune = false;
        this.dx = random(P_SPEED/10, P_SPEED);
        this.dy = random(P_SPEED/10, P_SPEED);

        if (random() * 10 > 5){
            this.dx *= -1;
        }

        if (random() * 10 > 5){
            this.dy *= -1;
        }
    }

    setInfected() {
        
        if(this.immune == false) {
            this.infected = true;
        }
    }

    getIntesity() {
        /*  T_INFECTION: 100% 
            this.infectionTimer: current percentage 
            maximum return: 255
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
        if ((nextX < R_POINT) || (nextX > width - R_POINT - B_COLUMN)) {
            this.dx *= -1;
        }

        this.vec.x = this.vec.x + 1 * deltaTime * this.dx; // jetzt nochmal nächste x-Pos
        
        /* wenn oben oder unten raus, y-Richtung umkehren. */
        if ((nextY < R_POINT) || (nextY > height - R_POINT)){
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