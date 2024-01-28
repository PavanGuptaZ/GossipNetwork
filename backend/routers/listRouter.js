import express from "express";
import { getChatsList, getGroupsList, getChatsSearchList, getGroupsSearchList } from '../controller/listController.js'
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router()

router.use(verifyJWT)

router.get('/chats', getChatsList)
router.get('/search/users', getChatsSearchList)

router.get('/groups', getGroupsList)
router.get('/search/groups', getGroupsSearchList)


export default router