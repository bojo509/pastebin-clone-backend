import Document from "../Models/Document.js";

//Works
export const getDocuments = async (req, res) => {
    try {
        const documents = await Document.findOne();
        if (documents.length === 0) {
            return res.status(404).json({ message: `No documents found` });
        }
        else {
            return res.status(200).json(documents);
        }
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

//Works
export const createDocument = async (req, res) => {
    const { value } = req.body;
    if (!value) {
        return res.status(400).send({ message: "Document cannot be empty" });
    }

    const searchId = Math.random().toString(36).substring(7);
    const document = { value, searchId }

    const newDocument = new Document(document);
    try {
        await newDocument.save();
        res.status(201).json({ newDocument });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

export const deleteDocument = async (req, res) => {
    const { id } = req.params;
    const document = await Document.findOne({ searchId: id })
    if (!document) {
        return res.status(404).send(`No document with id: ${id}`);
    }
    await Document.deleteOne({ searchId: id });
    res.status(200).json({ message: "Document deleted successfully." });
}

export const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const document = await Document.findOne({ searchId: id })
        if (!document) {
            return res.status(404).send(`No document with id: ${id}`);
        }

        const updatedDocument = { value, searchId: id };
        await Document.updateOne({ searchId: id }, updatedDocument, { new: true });
        res.status(200).json(updatedDocument);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

//Works
export const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document.findOne({ searchId: id });
        if (!document) {
            return res.status(404).send(`No document with id: ${id}`);
        }

        res.status(200).json({
            document
        });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

//Works
export const flushDb = (req, res) => {
    Document.deleteMany({})
    .then(() => res.status(200).json({ message: "Database flushed successfully." }))
    .catch((error) => res.status(400).send({ message: error.message }));
}