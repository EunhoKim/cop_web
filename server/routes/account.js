import express from 'express';
import Account from '../models/account';

const router = express.Router();


/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
	console.log('getinfo ====== ' + req.session.loginInfo.username);
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});


/*
    SEARCH USER: GET /api/account/search/:username
*/
router.get('/search/:username', (req, res) => {
    // SEARCH USERNAMES THAT STARTS WITH GIVEN KEYWORD USING REGEX
    var re = new RegExp('^' + req.params.username);
    Account.find({username: {$regex: re}}, {_id: false, username: true})
    .limit(5)
    .sort({username: 1})
    .exec((err, accounts) => {
        if(err) throw err;
        res.json(accounts);
    });
});

// EMPTY SEARCH REQUEST: GET /api/account/search
router.get('/search', (req, res) => {
    res.json([]);
});

router.post('/loginSession', (req, res) => {
	// ALTER SESSION
    let session = req.session;
    console.log(" loginSession ========================== " +req.body.id);
    
 // CREATE ACCOUNT
    let account = new Account({
        username: req.body.id
    });
    
    session.loginInfo = {
    	_id: account._id,
        username: req.body.id
    };
    
    // RETURN SUCCESS
    return res.json({
        success: true
    });
});
export default router;
