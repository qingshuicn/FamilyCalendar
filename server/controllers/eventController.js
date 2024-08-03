const Event = require('../models/Event');
const socketSetup = require('../socket');

exports.addEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      role: req.body.role
    });

    const savedEvent = await newEvent.save();

    // 获取 Socket.IO 实例
    const io = socketSetup.getIo();
    // 发送新事件到所有连接的客户端
    io.emit('newEvent', savedEvent);

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};