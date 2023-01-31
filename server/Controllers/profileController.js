const profile = require("../models/profile");
const profileService = require("../services/profileService");
 
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json({ data: profiles, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getProfileByName = async (req, res) => {
  const { name } = req.body;
  try {
    const profile = await profileService.getProfileByName(name);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await profileService.getProfileByName(req.body);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { name, password} = req.body;
    if (!name || !password) {
      return res.status(400).json({message: "du må ha navn og passord"});
    } else if(await profileService.getProfileByName(name)) {
      return res.status(400).json({message: "brukernavn allerede i bruk"});
    } else {
      await profileService.createProfile(new profile({name: name, password: password}));
      res.status(200).json({ message: "profile created"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await profileService.updateProfile(req.params.id, req.body);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await profileService.deleteProfile(req.params.id);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.auth = async (req, res) => {
  try {
    const { name, password} = req.body;
    profile.findOne({ name: name }).then((profile) => {
      if (!profile) {
        return res.status(400).json({message: "Profil finnes ikke"})
      } else if (profile.password != password) {
        return res.status(400).json({message: "Profil matcher ikke passordet"})
      } else {
        req.session.profile = profile
        return res.status(200).json({message: "Logget inn.", profile})
      }
    })
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

exports.authCheck = async (req, res) => {
  const sessProfile = req.session.profile;
  if (sessProfile) {
    return res.status(201).json({ msg: "Autistikert :)", sessProfile });
  } else {
    return res.status(401).json({ msg: "Unautorisert" });
  }
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
    //destroy session
    if (err) throw err;
    res.clearCookie("session-id"); // clear cookie
    res.send("Logget ut.");
  });
}