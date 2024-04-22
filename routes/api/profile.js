const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const VehicleOwner = require("../../models/VehicleOwner");
const { check, validationResult } = require("express-validator");

// @route   Get api/profile/me
// @desc    Get Current users profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/profile
// @desc    Create or update user profile
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("nic", "NIC is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nic, address } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      nic: nic,
      address: address,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   Get api/profile
// @desc    Get all profiles
// @access  public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profiles) return res.status(400).json({ msg: "Profile not found" });

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //Remove User
    await VehicleOwner.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/userlicense
// @desc    Add User License
// @access  Private

router.put(
  "/userlicense",
  auth,
  [
    check("licensenumber", "License Number is required").not().isEmpty(),
    check("expirydate", "Expiry Date is required").not().isEmpty(),
    check("issueddate", "Issued Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { licensenumber, expirydate, issueddate } = req.body;

    const newUserL = {
      licensenumber,
      expirydate,
      issueddate,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.userlicense.unshift(newUserL);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/userlicense/ul_id
// @desc    Delete User License from profile
// @access  Private

router.delete("/userlicense/:ul_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index

    const removeIndex = profile.userlicense
      .map((item) => item.id)
      .indexOf(req.params.ul_id);

    profile.userlicense.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route   PUT api/profile/vehicleinsurance
// @desc    Add Vehicle Insurance
// @access  Private

router.put(
  "/vehicleinsurance",
  auth,
  [
    check("insurancenumber", "License Number is required").not().isEmpty(),
    check("insurancetype", "Insurance Type is required").not().isEmpty(),
    check("expirydate", "Expiry Date is required").not().isEmpty(),
    check("issueddate", "Issued Date is required").not().isEmpty(),

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { insurancenumber,insurancetype, expirydate, issueddate } = req.body;

    const newUserI = {
      insurancenumber,
      insurancetype,
      expirydate,
      issueddate,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.vehicleinsurance.unshift(newUserI);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route   DELETE api/profile/vehicleinsurance/vi_id
// @desc    Delete Vehicle Insurance from profile
// @access  Private

router.delete("/vehicleinsurance/:vi_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index

    const removeIndex = profile.vehicleinsurance
      .map((item) => item.id)
      .indexOf(req.params.vi_id);

    profile.vehicleinsurance.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
