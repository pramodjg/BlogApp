import React, { Platform } from 'react-native';
import _ from 'underscore';

import HomePage from '../HomePage';
import DetailPage from '../DetailPage';

module.exports = function (scene) {
    var componentMap = {
        'HomePage': {
            title: 'Articles - @lightrainstech',
            id: 'home'
        },
        'DetailPage': {
            title: 'Articles - @lightrainstech',
            id: 'detail'
        }
    }

    return componentMap[scene];
}
