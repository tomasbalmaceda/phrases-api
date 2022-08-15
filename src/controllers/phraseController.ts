import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Phrase } from "../models/Phrase";

const phraseController = {
  createPhrase: async (req: Request, res: Response) => {
    const { author, text } = req.body;

    if (!author) {
      return res.status(400).json({ msg: "author is required" });
    }

    if (!text) {
      return res.status(400).json({ msg: "text is required" });
    }

    const phrase = {
      author,
      text,
    };

    try {
      await Phrase.create(phrase);
      res.status(201).json({ msg: "User sucefully created" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  getPhrases: async (req: Request, res: Response) => {
    try {
      const phrases = await Phrase.findAll();
      res.status(200).json(phrases);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  getPhrase: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const phrase = await Phrase.findByPk(id);
      if (phrase) {
        return res.status(200).json(phrase);
      }
      res.status(404).json({ msg: "Usuario não encontrado" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  updatePhrase: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { author, text } = req.body;

    if (!author && !text) {
      return res.status(400).json({ error: "Author or text is required!" });
    }

    let phrase = await Phrase.findByPk(id);

    try {
      if (phrase) {
        if (author) {
          phrase.author = author;
        }

        if (text) {
          phrase.text = text;
        }

        await phrase.save();
        return res.status(200).json({ msg: "Sucefully updated" });
      } else {
        return res.status(404).json({ error: "Phrase not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  deletePhrase: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await Phrase.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ msg: "User sucefully deleted" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  randomPhrase: async (req: Request, res: Response) => {
    let phrase = await Phrase.findOne({ order: [Sequelize.fn("RANDOM")] });

    if (!phrase) {
      return res.status(404).json({ error: "Phrases not found" });
    }

    try {
      return res.status(200).json(phrase);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};

export default phraseController;
