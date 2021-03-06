//level counter, used for events within levels
var lvi = 0;

//current level
var lv = undefined;
var lvicon = undefined;

//max polygon hitpoints
var max_poly_hp;

//sandbox select
sbx_select = "Basic_Tank";

//is sbx menu open?
sbx_menu_open = false;

//all levels
var lvls = [
    {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 1200;

            for (var i = 0; 10 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 8 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 2 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
        },
        frame: function () {
            if (between(lvi, 0, 21)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                    if (lvi == 5) {
                        lvi = 4;
                    }
                    if (lvi == 8) {
                        lvi = 7;
                    }
                    if (lvi == 12) {
                        lvi = 11;
                    }
                    if (lvi == 13) {
                        lvi = 14;
                    }
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                    if (lvi == -1) {
                        lvi = 0;
                    }
                }
            }
            if (lvi == 4 && o.filter(e => { return e.tank_type == "Relay_Tower"; }).length > 0) {
                lvi = 5;
            }
            if (lvi == 7 && o.filter(e => { return e.tank_type == "Miner_Tower"; }).length > 0) {
                lvi = 8;
            }
            if (lvi == 11 && o.filter(e => { return e.tank_type == "Basic_Tower"; }).length > 0) {
                lvi = 12;
            }
            if (lvi == 12) {
                o.push(Basic_Tank(2000, 0));
                lvi = 13;
            }
            if (lvi == 13) {
                lvi = 14;
            }



            var diff = 30 * (1 - (get_shape_total_hp().hp / 2) / max_poly_hp);

            if (l % 300 == 0 && diff > 3) {
                for (var i = 0; diff / 3 > i; i++) {
                    o.push(Basic_Tank(1000 * Math.random() + 3000, 1000 * Math.random()));
                }
            }


        },
        draw: function () {
            var texts = [
                "Welcome to DiepTD, the real-time strategy game based on diep.io! Use the right arrow key to continue (left to go back).",
                "Your goal is to build a base which can collect resources, and fight off enemy tanks.",
                "The tower you currently have is called a generator. It generates power for your other towers.",
                "However, while it can generate power, it cannot move it from one tower to another.",
                "Select a relay (using the button or the '2' key). Place it by clicking. Make sure the generator is inside of its range.",//4
                "Now that you have a relay, you can power other tanks. Deselect the relay by right-clicking anyhwere.",
                "What other tanks, you may ask? Get a miner, using either the rightmost button, or the '5' key.",
                "Place it inside of the relay's radius, but also make sure one of the squares, triangles, or pentagons is in its radius.",
                "Miners convert these shapes into points which can be spent on more towers.",//8
                "If you placed the miner wrong, press the 'X' key to remove it. All of your points will be refunded.",
                "Eventually, enemy tanks will begin to attack. You're going to need some defenses.",
                "Place a tank (hotkey 1) to the right of your other towers. That is where the first enemy will be approaching from.",
                "",//12
                "",
                "The enemy tank is approaching now. To see it more easily, move your view by dragging your mouse, or zoom using the +- keys or the mouse wheel.",
                "More enemies will arrive soon. You may want to upgrade your tower to deal with the enemy tanks you will encounter later.",
                "Click the tank to select it. You can upgrade your tower to a twin, a machine gun, or a sniper using the Q, W, or E keys, or the buttons.",//16
                "Your goal is now to mine half of the shapes on the map. Enemy tanks will begin to appear more and more frequently as you mine shapes.",
                "They will appear from a single direction, but you will encounter many of them.",
                "You'll need to get lots of tanks, healers (which heal your tanks), and even generators, in case your power runs out.",
                "Remember: Your goal is to mine HALF of the points on the map! You can see the remaining points you need in the top left corner.",
                "Good luck!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp - max_poly_hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp - max_poly_hp < 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k["Enter"]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }, {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 3600;

            for (var i = 0; 60 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 48 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 16 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
        },
        frame: function () {
            if (between(lvi, 0, 3)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }
            }


            var diff = 90 * (1 - (get_shape_total_hp().hp / 2) / max_poly_hp);

            if (l % 900 == 0) {
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random()
                    switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            break;
                        case 1:
                            if (diff > 3) {
                                o.push(Twin_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                        case 2:
                            if (diff > 6) {
                                o.push(Triple_Shot_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                        case 3:
                            if (diff > 9) {
                                o.push(Triplet_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                    }
                }
            }



        },
        draw: function () {
            var texts = [
                "This is the first level of Diep TD. Use the right arrow key to continue (left to go back).",
                "Like in the tutorial, your goal here is to mine half of the shapes.",
                "Tanks will attack you from all directions, and many types of powerful tanks will show up as well.",
                "Good luck!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp - max_poly_hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp - max_poly_hp < 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k["Enter"]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }, {
        init: function () {
            o.push(Generator_Tower(0, 0));
            o.push(Alpha_Pentagon_Polygon(300, 300));
            max_poly_hp = get_shape_total_hp().mhp;
        },
        frame: function () {
            if (between(lvi, 0, 2)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }
            }


            var diff = 100 * (1 - (get_shape_total_hp().hp) / max_poly_hp);

            if (l % 1500 == 0) {
                for (var i = 0; diff > i; i++ ) {
                    var angle = l + Math.random() / 1.5;
                    switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            break;
                        case 1:
                            if (diff > 3) {
                                o.push(Twin_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                        case 2:
                            if (diff > 6) {
                                o.push(Triple_Shot_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                        case 3:
                            if (diff > 9) {
                                o.push(Triplet_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                    }
                }
            }



        },
        draw: function () {
            var texts = [
                "There is a type of pentagon known as the Alpha Pentagon.",
                "It is far larger and far more durable than the regular pentagon, but grants more points.",
                "The tanks seem to want this alpha pentagon too... Better mine it first!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp <= 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k["Enter"]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }, {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 4000;

            for (var i = 0; 45 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 36 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 12 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
            pt = 750;
        },
        frame: function () {
            if (between(lvi, 0, 3)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }   
            }


            var diff = 12 * (1 - (get_shape_total_hp().hp / 2) / max_poly_hp) + l / 4800 + 1;

            if (l % 325 == 0) {
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random() * 0.1 + l / 700;
                    simple_random_four_tanks(4000, angle);
                }
            }



        },
        draw: function () {
            var texts = [
                "This is like level one, but with a subtle difference.",
                "Before, as you mined shapes, more enemy tanks would appear.",
                "However, now, you'll also encounter more tanks as time goes on, so make sure to mine them quickly!",
                "Good luck!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp - max_poly_hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp - max_poly_hp < 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k["Enter"]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }, {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 3000;

            for (var i = 0; 40 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 32 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 10 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
            pt = 750;
        },
        frame: function () {
            if (between(lvi, 0, 5)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }   
            }


            var diff = 10 * (1 - (get_shape_total_hp().hp / 2) / max_poly_hp) + l / 7200 + 1;

            if (l % 1300 == 0) {
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random() / 3;
                    simple_random_four_tanks(4000, angle);
                }
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random() / 3 + tau / 3;
                    simple_random_four_tanks(4000, angle);
                    o[o.length - 1].team = "orange";
                }
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random() / 3 + 2 * tau / 3;
                    simple_random_four_tanks(4000, angle);
                    o[o.length - 1].team = "purple";
                }
            }



        },
        draw: function () {
            var texts = [
                "You're going to meet some new enemies today!",
                "Orange and purple tanks have decided to team up with the red tanks we're all familiar with.",
                "Orange tanks have a thick layer of armor that reduces the damage of each bullet by the same amount.",
                "Purple tanks are also armored. All bullets do the same damage to them.",
                "Certain towers will be effective against certain types of tanks.",
                "It's your job to find out which ones do the job.",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp - max_poly_hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp - max_poly_hp < 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k["Enter"]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    },
    {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 6000;

            for (var i = 0; 20 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 16 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 5 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
            pt = 750;
        },
        frame: function () {
            if (between(lvi, 0, 5)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }   
            }


            var diff = l / 650;

            if (l % 3200 == 3199) {
                o.push(Diep_Alert("Enemies are approaching!"));
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random() / 3 + l / 2000;
                    var mag = 5000 + 3000 * Math.random();
                    simple_random_four_tanks(mag, angle);
                    o[o.length - 1].team = "green";
                }
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random() / 3 + l / 2000;
                    var mag = 5000 + 3000 * Math.random();
                    simple_random_four_tanks(mag, angle);
                    o[o.length - 1].team = "yellow";
                }
            }



        },
        draw: function () {
            var texts = [
                "The enemy tanks are coming up with some new strategies.",
                "They'll be sending yellow and green tanks against you.",
                "Yellow tanks form tightly-packed groups, punching holes through your defenses.",
                "Green tanks ignore your defenses entirely. They exclusively target relays.",
                "You'll also see some new types of tanks, like snipers.",
                "The enemies don't seem to have many resources this time though, so they should be gone after 20 minutes.",
                ""
            ];
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Time: " + (1200 - Math.floor(l / 60)) + " Seconds", 10, 75, 24);
            if (l / 60 > 1200) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k["Enter"]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }
];

lv = lvls[0];



var special_levels = [
    {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 8000;

            for (var i = 0; 180 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 144 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 48 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            //max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
            pt = 750;
        },
        frame: function () {
            if (between(lvi, 0, 3)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }   
            }


            var diff = l / 1800 + Math.pow(1.1, l / 1800);

            if (l % 2000 == 0) {
                for (var i = 0; 5 * diff > i; i++ ) {
                    var clump_size = 10000 + Math.random() * 6000;
                    var angle = tau * Math.random() * 0.15 + l / 1200;
                    switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            o.push(Basic_Tank(clump_size * Math.cos(angle), clump_size * Math.sin(angle)));
                            break;
                        case 1:
                            o.push(Twin_Tank(clump_size * Math.cos(angle), clump_size * Math.sin(angle)));
                            break;
                        case 2:
                            o.push(Triple_Shot_Tank(clump_size * Math.cos(angle), clump_size * Math.sin(angle)));
                            break;
                        case 3:
                            o.push(Triplet_Tank(clump_size * Math.cos(angle), clump_size * Math.sin(angle)));
                            break;
                    }
                }
            }


            if (o.filter(e => { return e.discrim == "s"; }).length < 50) {
                var clump_size = 8000;

                var choose = Math.random() * 93

                if (45 > choose) {
                    o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
                } else if (81 > choose) {
                    o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
                } else {
                    o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
                }
            }


        },
        draw: function () {
            var texts = [
                "Welcome to endless mode.",
                "Survive for as long as you can.",
                "That's all you need to do.",
                "Have fun!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Time Survived: " + Math.round(l / 60) + " Seconds", 10, 75, 24);
            // if (get_shape_total_hp().hp - max_poly_hp < 0) {
            //     ctx.textAlign = "center";
            //     diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
            //     if (k["Enter"]) {
            //         complete_level(lvicon);
            //     }
            // }
            ctx.restore();
        }
    },
    {
        init: function () {
            o.push(Generator_Tower(0, 0));

            lvi = 0;
            pt = 2147483647;
        },
        frame: function () {
            if (between(lvi, 0, 3)) {
                if (kd["ArrowRight"]) {
                    lvi++;
                }
                if (kd["ArrowLeft"]) {
                    lvi--;
                }   
            }

            if (kd[" "]) {
                o.push(tank_from_string(sbx_dropdown.value, tmc.x, tmc.y)());
                o[o.length - 1].team = sbx_team_dropdown.value;
            }

            if (kd["z"]) {
                sbx_menu_open = !sbx_menu_open;
            }

            if (sbx_menu_open) {
                sbx_dropdown.style.display = "block";
                sbx_team_dropdown.style.display = "block";
            } else {
                sbx_team_dropdown.style.display = "none";
            }

        },
        draw: function () {
            var texts = [
                "This is sandbox mode.",
                "There aren't any rules here, and you have virtually infinite money.",
                "You can even spawn tanks and shapes!",
                "Try messing around with it.",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Press SPACE to place non-tower objects.", 10, 75, 24);
            diep_text("press Z to open the placement menu.", 10, 100, 24);
            ctx.restore();
        }
    }
];