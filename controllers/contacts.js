const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swaggertags=['Contacts']
    const result = await mongodb.getDatabase().db('project1').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //#swaggertags=['Contacts']
    const itemId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('contacts').find({ _id:itemId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
}

const createContact = async(req, res) => {
    //#swaggertags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db('project1').collection('contacts').insertOne(contact);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the contact.')
    };
}

const updateContact = async(req, res) => {
    //#swaggertags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db('project1').collection('contacts').replaceOne({_id: contactId}, contact);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the contact.')
    };
}

const deleteContact = async(req, res) => {
    //#swaggertags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project1').collection('contacts').deleteOne({_id: contactId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the contact.')
    };
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};