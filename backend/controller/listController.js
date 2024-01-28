import bcrypt from 'bcrypt';
import UserModal from '../models/userModal.js'
import ChatsModal from '../models/chatsModal.js'
import GroupsModal from '../models/groupModal.js'
import jwt from 'jsonwebtoken';

const getChatsList = async (req, res) => {

    const list = await ChatsModal.find({ users: { $in: [req.user._id] } })

    if (list.length < 1) return res.status(404).json({ message: "No matching Chat found, add some friend by search name or email" })

    res.status(200).json({ list })
}

const getGroupsList = async (req, res) => {

    const list = await GroupsModal.find({ users: { $in: [req.user._id] } })

    if (list.length < 1) return res.status(404).json({ message: "No matching Chat found, add some friend by search name or email" })

    res.status(200).json({ list })


}
const getChatsSearchList = async (req, res) => {
    const search = req.query.search

    const { _id } = req.user

    const list = await UserModal.find({
        $and: [
            {
                $or: [
                    { email: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }]
            }, { _id: { $ne: _id } }
        ]
    }).select({ name: 1, profileIcons: 1, status: 1 }).lean()

    if (list.length < 1) {
        res.status(404).json({ message: "No results found by this name or emailId" })
        return
    }
    res.status(200).json({ list })
}
const getGroupsSearchList = async (req, res) => {
    console.log("getGroupsSearchList")
    res.status(200).json({ message: "getGroupsSearchList" })

}

export { getChatsList, getGroupsList, getChatsSearchList, getGroupsSearchList }