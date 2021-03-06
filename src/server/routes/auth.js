import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
		scope: ["profile", "https://www.googleapis.com/auth/calendar.readonly"],
    accessType: "offline",
    prompt: "select_account"
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
