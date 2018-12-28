//pythagorean distance function
function dist(x1, y1, x2, y2) {

    //do distance from origin if only one coordinate pair is provided
    if (x2 == undefined) {
        return Math.sqrt(x1 * x1 + y1 * y1);
    } else {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
}

//shorter notation for distance between two game objects
function dist_to_obj(a, b) {
    return dist(a.x, a.y, b.x, b.y);
}

//is this in my fov?
function in_fov(a, b) {
    if (dist_to_obj(a, b) <= a.fov) {
        return true;
    }
    return false;
}

//simple point to and move towards function
function simple_move_behavior(a, v, discrim, minrange) {
    var closest = find_closest(a, o, discrim);
    if (closest !== false) {
        if (dist_to_obj(a, o[closest]) > minrange) {
            a.angle = point_towards(a, o[closest]);
            a.dx += Math.cos(a.angle) * v;
            a.dy += Math.sin(a.angle) * v;
        } else if (dist_to_obj(a, o[closest]) < minrange - 10) {
            a.angle = point_towards(a, o[closest]);
            a.dx -= Math.cos(a.angle) * v;
            a.dy -= Math.sin(a.angle) * v;
        }
    }
}

//set angle based on closest applicable target
function get_angle_to_target(a, discrim, range) {
    var closest = find_closest(a, o, discrim);
    if (closest !== false && dist_to_obj(a, o[closest]) <= range) {
        return point_towards(a, o[closest]);
    }
    return false;
}

//"offset" transformation for bullets fired from transformed barrels
function offset_transform(x, y, ox, oy, a) {
    x += Math.sin(a) * ox;
    y += Math.cos(a) * ox;
    x += Math.cos(a) * oy;
    y += Math.sin(a) * oy;
    return {
        x: x,
        y: y
    };
}

//tests if in an angle range (bypassing issue of angle "resetting" from 2pi to 0). Always choosest smallest option between the two given ranges
function in_smallest_angle_range(a, b) {

}


//find closest
function find_closest(me, arr, discrim) {

    //index of object with minimum distance
    var min_dist_index = false;

    //minimum distance
    var min_dist = Infinity;

    //cycle through array, find minimum distance
    arr.forEach(function (e, i) {
        if (dist(e.x, e.y, me.x, me.y) < min_dist && e.discrim == discrim) {
            min_dist_index = i;
            min_dist = dist(e.x, e.y, me.x, me.y);
        }
    });

    return min_dist_index;
}

//find closest by tank type
function find_closest_by_tank_type(me, arr, discrim) {

    //index of object with minimum distance
    var min_dist_index = false;

    //minimum distance
    var min_dist = Infinity;

    //cycle through array, find minimum distance
    arr.forEach(function (e, i) {
        if (dist(e.x, e.y, me.x, me.y) < min_dist && e.tank_type == discrim) {
            min_dist_index = i;
            min_dist = dist(e.x, e.y, me.x, me.y);
        }
    });

    return min_dist_index;
}

//finds direction pointing towards a given object
function point_towards(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

//get all indexes of objects in range of a given tower
function get_all_in_range(a, arr, discrim) {
    
    //all in range
    var in_range = [];
    
    arr.forEach(function (e, i) {
        if (dist(e.x, e.y, a.x, a.y) <= a.fov && e.discrim == discrim && e != a) {
            in_range.push(i);
        }
    });

    return in_range;
}

//get all indexes of objects in range of a given tower (except based on tank type)
function get_all_in_range_by_tank_type(a, arr, discrim) {
    
    //all in range
    var in_range = [];
    
    arr.forEach(function (e, i) {
        if (dist(e.x, e.y, a.x, a.y) <= a.fov && e.tank_type == discrim && e != a) {
            in_range.push(i);
        }
    });

    return in_range;
}

//clamp between two values
function clamp(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}

//generator count
function generator_count() {
    var count = 0;
   
    o.forEach(function (e) {
        if (e.tank_type == "generator") {
            count++;
        }
    });

    return count;
}

function index_of_obj(arr, obj) {
    arr.forEach(function (e, i) {
        if (e === obj) {
            return i;
        }
    })

    return -1;
}

function discriminate(discrim) {
    var subset = [];

    o.forEach(function (e) {
        if (e.discrim == discrim) {
            subset.push(e);
        }
    });

    return subset;
}

function discriminate_by_tank_type(discrim, arr) {
    var subset = [];

    if (arr == undefined) {
        arr = o;
    }

    arr.forEach(function (e) {
        if (e.tank_type == discrim) {
            subset.push(e);
        }
    });

    return subset;
}

function request_power(a) {
    var connected = find_closest_by_tank_type(a, o, "relay");

    if (connected && in_fov(o[connected], a) && a.power / a.power_cap < 0.5 && a.t % 20 == 0) {
        o.push(Request_Signal(a, o[connected], a.power_cap - a.power, a));
    }
}

//group towers into specific subsets by seeing how they're connected
function group_towers() {
    
    var towers = discriminate_by_tank_type("relay").concat(discriminate_by_tank_type("generator"));

    var groups = [];

    var tc = 0;

    while (towers.length > 0) {
        tc = 0;
        while (towers.length > tc && towers[tc].tank_type == "generator") {
            tc++;
        }
        if (towers.length != tc) {
            var active = [towers[tc]];
            towers.splice(tc, 1);
            for (var i2 = 0; active.length > i2; i2++) {
                for (var i = 0; towers.length > i; i++) {
                    if (in_fov(active[i2], towers[i])) {
                        active.push(towers[i]);
                        towers.splice(i, 1);
                        i--;
                    }
                }
            }
            groups.push({ all: active, gen: discriminate_by_tank_type("generator", active) });
        } else {
            for (var i = 0; towers.length > i; i++) {
                groups.push([towers[i]]);
                towers.splice(i, 1);
                i--;
            }
        }
    }

    return groups;

}

//find group of generator
function find_gen_of_group(gen) {
    for (var i = 0; gt.length > i; i++) {
        for (var i2 = 0; gt[i].gen.length > i2; i2++) {
            if (gt[i].gen[i2] == gen) {
                return i;
            }
        }
    }
}

//power something
function distrib_power(a, gen, power) {
    var group = find_gen_of_group(gen);
    gt[group].gen.forEach(function (e) {
        if (e.power > power / gt[group].gen.length) {
            e.power -= power / gt[group].gen.length;
            a.power += power / gt[group].gen.length;
        } else {
            a.power += e.power;
            e.power = 0;
        }
    });
}

//determine shape total hp
function get_shape_total_hp() {
    var shapes = discriminate("s");

    var hp = 0;

    var mhp = 0

    shapes.forEach(function (e) {
        hp += e.hp;
        mhp += e.mhp;
    });

    return {
        hp: hp,
        mhp: mhp
    };
}