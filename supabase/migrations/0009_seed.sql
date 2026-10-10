-- Placeholder seed (pwedeng i-edit sa /admin).
insert into public.packages (id, name, hours, summary, inclusions, featured, sort) values
 ('classic','Classic Twirl',2,'Para sa intimate na celebration at maliliit na program.', array['2 oras na unlimited 360 shots','Standard platform (hanggang 3 tao)','Branded video overlay','QR event gallery para sa guests','Basic props'], false, 1),
 ('signature','Signature Twirl',3,'Ang pinakakinukuha para sa kasal at debut.', array['3 oras na unlimited 360 shots','Large platform (hanggang 5 tao)','Custom overlay na may pangalan at petsa','QR event gallery + instant sharing station','Themed props at LED lights','Booth attendant at host'], true, 2),
 ('grand','Grand Twirl',4,'Para sa corporate events, Christmas parties at malalaking crowd.', array['4 oras na unlimited 360 shots','Large platform + backdrop','Company-branded overlay at intro','QR event gallery na may company logo','Slow-mo at boomerang effects','2 booth attendants','Lahat ng video sa isang download link'], false, 3)
on conflict (id) do nothing;
