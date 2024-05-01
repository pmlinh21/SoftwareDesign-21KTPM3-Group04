import React from 'react';
import { useState, useEffect } from 'react';
import "../styles/commons.css";
import { commonService } from "../services/CommonService";
import {formatCapitalFirstLetter} from '../util/formatText';

function Post() {
    return (
        <div>
            {/* Search bar */}
            <Search search="" isResult={false} />

        </div>
    )
}
export default Post;