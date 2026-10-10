-- Placeholder seed (editable in /admin).
insert into public.packages (id, name, hours, summary, inclusions, featured, sort) values
 ('classic','Classic Twirl',2,'For intimate celebrations and short programs.', array['2 hours of unlimited 360 shots','Standard platform (up to 3 people)','Branded video overlay','QR event gallery for guests','Basic props'], false, 1),
 ('signature','Signature Twirl',3,'The go-to package for weddings and debuts.', array['3 hours of unlimited 360 shots','Large platform (up to 5 people)','Custom overlay with your names and date','QR event gallery + instant sharing station','Themed props and LED lights','Booth attendant and host'], true, 2),
 ('grand','Grand Twirl',4,'For corporate events, Christmas parties and big crowds.', array['4 hours of unlimited 360 shots','Large platform + backdrop','Company-branded overlay and intro','QR event gallery with your company logo','Slow-mo and boomerang effects','2 booth attendants','Every video in one download link'], false, 3)
on conflict (id) do nothing;
