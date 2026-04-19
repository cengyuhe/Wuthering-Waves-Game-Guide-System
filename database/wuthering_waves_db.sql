-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2026 at 03:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wuthering_waves_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `element` varchar(50) DEFAULT NULL,
  `weapon` varchar(50) DEFAULT NULL,
  `rarity` int(11) DEFAULT NULL,
  `guide_content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT 'default.jpg',
  `mat_1` varchar(100) DEFAULT NULL,
  `mat_2` varchar(100) DEFAULT NULL,
  `mat_3` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`id`, `name`, `element`, `weapon`, `rarity`, `guide_content`, `image_url`, `mat_1`, `mat_2`, `mat_3`) VALUES
(1, 'Sigrika', 'Aero', 'Gauntlets', 5, 'Sigrika in Wuthering Waves is a 5 Stars Aero character who wields a Gauntlets as their weapon type.\r\n\r\nSigrika, a student of Startorch Academy and a Resonator of Royan Runes. Determined to live up to others\' expectations and become a true Solsworn, she devotes herself fully to every challenge.', 'sigrika.jpg', 'Our Choice', 'Arithmetic Shell', 'Intact Exoswarm Pendant'),
(2, 'Luuk Herssen', 'Spectro', 'Gauntlets', 5, 'Luuk Herssen in Wuthering Waves is a 5 Stars Spectro character who wields a Gauntlets as their weapon type.\r\n\r\nThe attending physician of Startorch Academy\'s Resonator Nursing Unit, renowned for his keen intellect and unshakable composure. Rumor has it nobody has ever seen him lose control. He is a keen listener adept at dissecting the shadows in a person\'s heart. From the unhealing wound on his hand, golden blood seeps, a substance he can summon to become a blade of utmost precision.', 'luuk_herssen.jpg', NULL, NULL, NULL),
(3, 'Aemeath', 'Fusion', 'Sword', 5, 'Aemeath in Wuthering Waves is a 5 Stars Fusion character who wields a Sword as their weapon type.\r\nOnce an Exostrider Synchronist of Rabelle College, she is now a digital ghost who sings quietly amongst stars.', 'aemeath.jpg', NULL, NULL, NULL),
(4, 'Mornye', 'Fusion', 'Broadblade', 5, 'Mornye in Wuthering Waves is a 5 Stars Fusion character who wields a Broadblade as their weapon type.\r\n\r\nMornye, a Spacetrek Collective Research Institute engineer and a Department of Exostrider Engineering professor at Startorch Academy. Each step on her prosthetic legs carries her toward the stars of her dreams.', 'mornye.jpg', NULL, NULL, NULL),
(5, 'Lynae', 'Spectro', 'Pistols', 5, 'Lynae in Wuthering Waves is a 5 Stars Spectro character who wields a Pistols as their weapon type.\r\n\r\nA Startorch Academy prep student whose head-turning, electric style hides an inner focus as explosive as a coiled spring.', 'lynae.jpg', NULL, NULL, NULL),
(6, 'Buling', 'Electro', 'Rectifier', 4, 'Buling in Wuthering Waves is a 4 Stars Electro character who wields a Rectifier as their weapon type.\r\n\r\nTaoist of Mengzhou, Black Shores Consultant, feng shui master, and veteran forum dweller. Easygoing and well-traveled, Buling will \"bling\" whatever you seek.', 'buling.jpg', NULL, NULL, NULL),
(7, 'Chisa', 'Havoc', 'Broadblade', 5, 'Chisa in Wuthering Waves is a 5 Stars Havoc character who wields a Broadblade as their weapon type.\r\n\r\n\"Just an ordinary student.\" Calmly, she introduces herself, a faint iridescent shimmer flickering in her eyes. Again, the structures of the world reveal themselves in her vision. Narrowing her eyes, she singles out the very thread that tugs at life itself.', 'chisa.jpg', NULL, NULL, NULL),
(8, 'Qiuyuan', 'Aero', 'Sword', 5, 'Qiuyuan in Wuthering Waves is a 5 Stars Aero character who wields a Sword as their weapon type.\r\n\r\nFormer senior agent of Mingting\'s Internal Security Agency. Though enmity filled his younger days, loyalty defined his later years. However, scapegoated for a murder, he is now but a blind swordsman wandering the world alone.', 'qiuyuan.jpg', 'Truth in Lies\r\n', 'Wintry Bell', 'FF Whisperin Core\r\n'),
(9, 'Galbrena', 'Fusion', 'Pistols', 5, 'Galbrena in Wuthering Waves is a 5 Stars Fusion character who wields a Pistols as their weapon type.\r\n\r\nCold and decisive, she is the \"Discord Slayer\" who hunts across Solaris and the same \"Fiend of Ever-burning Flame\" spoken of in whispers. Now, she serves as a Black Shores Consultant, active across the world.', 'galbrena.jpg', NULL, NULL, NULL),
(10, 'Iuno', 'Aero', 'Gauntlets', 5, 'Iuno in Wuthering Waves is a 5 Stars Aero character who wields a Gauntlets as their weapon type.\r\n\r\nShe is favored by fate under one name, and swept away by it in another. Yet never once has she been defeated, nor has she ever yielded. Now, witness the defiant Priestess. Witness what keeps her striding forward, never to look back. Witness how she walks the intricate web of destiny and becomes the only answer.', 'iuno.jpg', NULL, NULL, NULL),
(11, 'Augusta', 'Electro', 'Broadblade', 5, 'Augusta in Wuthering Waves is a 5 Stars Electro character who wields a Broadblade as their weapon type.\r\n\r\nEphor of Septimont. The undying sun eternally ablaze, and a banner under which defeat does not exist. She comes. She sees. She conquers. With blade held high, she awaits the next challenger or the fate that claims it cannot be defied.', 'augusta.jpg', NULL, NULL, NULL),
(12, 'Phrolova', 'Havoc', 'Rectifier', 5, 'Phrolova in Wuthering Waves is a 5 Stars Havoc character who wields a Rectifier as their weapon type.\r\n\r\nPhrolova, a Fractsidus Overseer walking the fine line between life and death, an uncanny, deadly conductor. A silent wave of her baton is enough to attune the very frequencies of being and conduct the symphonies of \"souls.\" The music of hers can sculpt a better world or, just as easily, summon a legion to wreak havoc.', 'phrolova.jpg', NULL, NULL, NULL),
(13, 'Lupa', 'Fusion', 'Broadblade', 5, 'Lupa in Wuthering Waves is a 5 Stars Fusion character who wields a Broadblade as their weapon type.\r\n\r\nA Gladiator of Septimont, a radiant star of the arena. Fiery and straightforward, Lupa lives like a wild lone wolf. As long as she can savor the adrenaline rush of battle, she doesn\'t mind if that same fire ends up consuming her whole.', 'lupa.jpg', NULL, NULL, NULL),
(14, 'Cartethyia', 'Aero', 'Sword', 5, 'Cartethyia in Wuthering Waves is a 5 Stars Aero character who wields a Sword as their weapon type.\r\n\r\nCartethyia, the wandering knight who travels across Rinascita. Formerly known as the Blessed Maiden, the vessel of Divinity, and the Queen of Gale and Tide, she went by the name Fleurdelys. Now, she is simply a free and unfettered wandering knight.\r\n\r\n', 'cartethyia.jpg', NULL, NULL, NULL),
(15, 'Ciaccona', 'Aero', 'Pistols', 5, 'Ciaccona in Wuthering Waves is a 5 Stars Aero character who wields a Pistols as their weapon type.\r\n\r\nA wandering bard from Rinascita, Ciaccona. She sings not only for the Divinity, but also for the common folk. She records stories along her journeys, turning them into songs that evoke laughter, emotion, and tears in both the storytellers and the audience.', 'ciaccona.jpg', NULL, NULL, NULL),
(16, 'Zani', 'Spectro', 'Gauntlets', 5, 'Zani in Wuthering Waves is a 5 Stars Spectro character who wields a Gauntlets as their weapon type.\r\n\r\nA member of Averardo Vault\'s security team and holder of \"Best Employee\" for longer than she cares to count. She has made plenty of plans for her free time, but for now, her biggest mission is simple: clocking out on time.', 'zani.jpg', NULL, NULL, NULL),
(17, 'Cantarella', 'Havoc', 'Rectifier', 5, 'Cantarella in Wuthering Waves is a 5 Stars Havoc character who wields a Rectifier as their weapon type.\r\n\r\nThe current head of Fisalia, Cantarella, the Bane. A mysterious noblewoman, her beauty as captivating as it is perilous. She resides in a crown-like castle perched atop the mountain, where illusory dreams flow like streams, meticulously spun by her own hands.', 'cantarella.jpg', NULL, NULL, NULL),
(18, 'Brant', 'Fusion', 'Sword', 5, 'Brant in Wuthering Waves is a 5 Stars Fusion character who wields a Sword as their weapon type.\r\n\r\nBrant, the captain of Rinascita\'s Troupe of Fools, is a free spirit and romantic. Unpredictable and full of life, he is the beating heart of the troupe. On stage, he slips into countless roles, donning new masks to breathe life into every story. Yet beyond the spotlight, he is unwaveringly genuine, offering nothing but true sincerity to those around him.\r\n\r\n', 'brant.jpg', NULL, NULL, NULL),
(19, 'Phoebe', 'Spectro', 'Rectifier', 5, 'Phoebe in Wuthering Waves is a 5 Stars Spectro character who wields a Rectifier as their weapon type.\r\n\r\nPhoebe, Acolyte of the Order of the Deep, is a young woman of quiet devotion. With a kind heart, she fulfills her duties with unwavering diligence. Her prayers, like the light she carries, offer comfort and peace to all.', 'phoebe.jpg', NULL, NULL, NULL),
(20, 'Roccia', 'Havoc', 'Gauntlets', 5, 'Roccia in Wuthering Waves is a 5 Stars Havoc character who wields a Gauntlets as their weapon type.\r\n\r\nAssistant, prop master, and improv comedian, Roccia is always there to make sure the Troupe of Fools is at the ready. The Magic Box she carries appears to hold the world, or perhaps she had recreated a world inside the box.', 'roccia.jpg', NULL, NULL, NULL),
(21, 'Carlotta', 'Glacio', 'Pistols', 5, 'Carlotta in Wuthering Waves is a 5 Stars Glacio character who wields a Pistols as their weapon type.\r\n\r\nThe second daughter of Montelli and an art investor unbound by convention, Carlotta moves seamlessly through social circles and business transactions while quietly handling the family\'s unspeakable \"troubles\" in secret. The blooming of a \"gem,\" the taking of a life—In her own name, she reshapes reality, giving it a new dimension.', 'carlotta.jpg', NULL, NULL, NULL),
(22, 'Lumi', 'Electro', 'Broadblade', 4, 'Lumi in Wuthering Waves is a 4 Stars Electro character who wields a Broadblade as their weapon type.\r\n\r\nNavigator at Lollo Logistics and leader of a transport squad. Born in a mountain village in Yuezhou, Lumi\'s sincere and caring nature brings warmth to everyone around her.', 'lumi.jpg', NULL, NULL, NULL),
(23, 'Camellya', 'Havoc', 'Sword', 5, 'Camellya in Wuthering Waves is a 5 Stars Havoc character who wields a Sword as their weapon type.\r\n\r\nA Bloom Bearer of the Black Shores, Camellya is free-spirited and dangerously charming. She roams Solaris in search of talent, immersing herself in the present and relishing its pleasures, all while remaining true to herself, unburdened by thoughts of the past or future.', 'camellya.jpg', NULL, NULL, NULL),
(24, 'Youhu', 'Glacio', 'Gauntlets', 4, 'Youhu in Wuthering Waves is a 4 Stars Glacio character who wields a Gauntlets as their weapon type.\r\n\r\nA voluble and whimsical antique appraiser. Known for creating limericks on the spot, she presents her appraisals with flair and precision. She sets up a stall on the street, ensuring antiques find their way to those who truly cherish them.', 'youhu.jpg', NULL, NULL, NULL),
(25, 'Shorekeeper', 'Spectro', 'Rectifier', 5, 'Shorekeeper in Wuthering Waves is a 5 Stars Spectro character who wields a Rectifier as their weapon type.\r\n\r\nThe Shorekeeper, guardian of the Black Shores—this title alone once defined her. But desires, bonds, and emotions… She only began to understand these things after meeting you.', 'shorekeeper.jpg', NULL, NULL, NULL),
(26, 'Xiangli Yao', 'Electro', 'Gauntlets', 5, 'Xiangli Yao in Wuthering Waves is a 5 Stars Electro character who wields a Gauntlets as their weapon type.\r\n\r\nPrincipal Investigator at Jinzhou Huaxu Academy, and the Academy\'s youngest multi-disciplinary scientist. A gentle soul with a sharp mind, whose relentless passion for Automata Mechanics always translates into constructive findings and insights.', 'xiangliyao.jpg', NULL, NULL, NULL),
(27, 'Zhezhi', 'Glacio', 'Rectifier', 5, 'Zhezhi in Wuthering Waves is a 5 Stars Glacio character who wields a Rectifier as their weapon type.\r\n\r\nAn artist for hire trying to make a living. Reserved and timid, she is not good with words but speaks volumes through her art, where her creations come to life with impossible authenticity.', 'zhezhi.jpg', NULL, NULL, NULL),
(28, 'Changli', 'Fusion', 'Sword', 5, 'Changli in Wuthering Waves is a 5 Stars Fusion character who wields a Sword as their weapon type.\r\n\r\nChangli is a counselor serving the Jinzhou Magistrate, and former Secretary-General in the capital. Shrouded in flames, she\'s fated to burn brightly until her final embers. With her fiery determination and strategic mindset, she rises to power, always thinking ahead to reach her ultimate goal.', 'changli.jpg', NULL, NULL, NULL),
(29, 'Jinhsi', 'Spectro', 'Broadblade', 5, 'Jinhsi in Wuthering Waves is a 5 Stars Spectro character who wields a Broadblade as their weapon type.\r\n\r\nJinhsi, Magistrate of Jinzhou, gently brightens the hopes of her people, like rays of winter sunlight. As the revered Sentinel\'s Appointed Resonator, she displays humility and wholeheartedly commits herself to guiding her people towards a brilliant future.', 'jinhsi.jpg', NULL, NULL, NULL),
(30, 'Yinlin', 'Electro', 'Rectifier', 5, 'Yinlin in Wuthering Waves is a 5 Stars Electro character who wields a Rectifier as their weapon type.\r\n\r\nYinlin is a skilled Patroller and powerful Natural Resonator. After being suspended from her duties at the Public Security Bureau, she must now pursue hidden evils in secrecy.', 'yinlin.jpg', NULL, NULL, NULL),
(31, 'Jiyan', 'Aero', 'Broadblade', 5, 'Jiyan in Wuthering Waves is a 5 Stars Aero character who wields a Broadblade as their weapon type.\r\n\r\nJiyan, leader of the Midnight Rangers, acts with swift and resolute righteousness. He possesses the formidable ability to conjure a powerful Qingloong from the winds, making him invincible on the battlefield.', 'jiyan.jpg', NULL, NULL, NULL),
(32, 'Rover (Aero)', 'Aero', 'Sword', 5, 'Rover (Aero) in Wuthering Waves is a 5 Stars Aero character who wields a Sword as their weapon type.\r\n\r\nA mysterious Resonator with the power to absorb all sounds. Currently journeying to find their lost memories.', 'rover_aero.jpg', NULL, NULL, NULL),
(33, 'Rover (Havoc)', 'Havoc', 'Sword', 5, 'Rover (Havoc) in Wuthering Waves is a 5 Stars Havoc character who wields a Sword as their weapon type.\r\n\r\nA mysterious Resonator with the power to absorb all sounds. Currently journeying to find their lost memories.', 'rover_havoc.jpg', NULL, NULL, NULL),
(34, 'Rover (Spectro)', 'Spectro', 'Sword', 5, 'Rover (Spectro) in Wuthering Waves is a 5 Stars Spectro character who wields a Sword as their weapon type.\r\n\r\nA mysterious Resonator with the power to absorb all sounds. Currently journeying to find their lost memories.', 'rover_spectro.jpg', NULL, NULL, NULL),
(35, 'Jianxin', 'Aero', 'Gauntlets', 5, 'Jianxin in Wuthering Waves is a 5 Stars Aero character who wields a Gauntlets as their weapon type.\r\n\r\nJianxin, a Taoist monk and successor of Fengyiquan, has dedicated her life to mastering the ultimate martial art. With the power to harness and transform environmental Chi, she can create protective barriers that purify both body and mind.', 'jianxin.jpg', NULL, NULL, NULL),
(36, 'Calcharo', 'Electro', 'Broadblade', 5, 'Calcharo in Wuthering Waves is a 5 Stars Electro character who wields a Broadblade as their weapon type.\r\n\r\nLeader of the \"Ghost Hounds,\" an international mercenary group. Ruthless, vengeful, unforgiving. His Forte allows him to summon a special Tacet Discord to assist his assault on the targets. A potential client must be mindful of the price to pay before making him an offer.', 'calcharo.jpg', NULL, NULL, NULL),
(37, 'Encore', 'Fusion', 'Rectifier', 5, 'Encore in Wuthering Waves is a 5 Stars Fusion character who wields a Rectifier as their weapon type.\r\n\r\nA girl accompanied by one black and one white Wooly. Encore, consultant from the Black Shores, dreams of creating happy stories with candies, fairy tales, and her imagination.', 'encore.jpg', NULL, NULL, NULL),
(38, 'Lingyang', 'Glacio', 'Gauntlets', 5, 'Lingyang in Wuthering Waves is a 5 Stars Glacio character who wields a Gauntlets as their weapon type.\r\n\r\nAn enthusiastic, brave member of the Liondance Troupe in Jinzhou, Lingyang is a sincere, compassionate visitor of the human community with incredible physical abilities, whose interest in humans easily shows. With his unique style, he embodies the spirit of Liondance.', 'lingyang.jpg', NULL, NULL, NULL),
(39, 'Verina', 'Spectro', 'Rectifier', 5, 'Verina in Wuthering Waves is a 5 Stars Spectro character who wields a Rectifier as their weapon type.\r\n\r\nWith an extensive knowledge of botany, Verina is always solicitous, always smiling, and always wishing for every flower to be blessed with the miracle of life.', 'verina.jpg', NULL, NULL, NULL),
(40, 'Aalto', 'Aero', 'Pistols', 4, 'Aalto in Wuthering Waves is a 4 Stars Aero character who wields a Pistols as their weapon type.\r\n\r\nAalto is an enigmatic Information Broker, known for his elusive nature and welcoming smile. Underneath the facade, he is closely affiliated with the Black Shores. Rumor has it he\'ll provide any information at the right price.', 'aalto.jpg', NULL, NULL, NULL),
(41, 'Yangyang', 'Aero', 'Sword', 4, 'Yangyang in Wuthering Waves is a 4 Stars Aero character who wields a Sword as their weapon type.\r\n\r\nYangyang is an Outrider of the Midnight Rangers. Once sheltered, now a fighter. She soars with the wind to protect others, like a skylark in flight.', 'yangyang.jpg', NULL, NULL, NULL),
(42, 'Yuanwu', 'Electro', 'Gauntlets', 4, 'Yuanwu in Wuthering Waves is a 4 Stars Electro character who wields a Gauntlets as their weapon type.\r\n\r\nYuanwu owns a boxing gym where he teaches Leihuangquan and health management. He is well-respected in the community for his cordial demeanor and pleasant temperament.', 'yuanwu.jpg', NULL, NULL, NULL),
(43, 'Chixia', 'Fusion', 'Pistols', 4, 'Chixia in Wuthering Waves is a 4 Stars Fusion character who wields a Pistols as their weapon type.\r\n\r\nChixia is a spirited young Jinzhou Patroller who lights up the streets of Jinzhou. She\'s always ready to be the hero someone needs. She fuses such passion into the bullets that blast out of her fingertips.', 'chixia.jpg', NULL, NULL, NULL),
(44, 'Mortefi', 'Fusion', 'Pistols', 4, 'Mortefi in Wuthering Waves is a 4 Stars Fusion character who wields a Pistols as their weapon type.\r\n\r\nMortefi, a skilled expert in Applied Tacetite Study and a member of the Academy’s Department of Safety, possesses the unique ability to transform his accumulated frustration into fiery flames. From a burning wrath that consumes all, the red dragon shall descend.', 'mortefi.jpg', NULL, NULL, NULL),
(45, 'Sanhua', 'Glacio', 'Sword', 4, 'Sanhua in Wuthering Waves is a 4 Stars Glacio character who wields a Sword as their weapon type.\r\n\r\nThe bodyguard of Jinzhou\'s Magistrate, known for having an icy personality. Once regarded as the Asura of Calamity, Sanhua is now a taciturn guardian. She has learned to maintain inner calmness amidst the chaotic frequencies, and the things that once frightened her now fuel her determination.', 'sanhua.jpg', NULL, NULL, NULL),
(46, 'Baizhi', 'Glacio', 'Rectifier', 4, 'Baizhi in Wuthering Waves is a 4 Stars Glacio character who wields a Rectifier as their weapon type.\r\n\r\nBaizhi is a researcher in Remnant Ecoacoustics. Baizhi\'s once unfulfilled wish has now manifested as her loyal companion. The Remnant Creature You\'tan is her source of healing powers, and a lifelong research focus.', 'baizhi.jpg', NULL, NULL, NULL),
(47, 'Danjin', 'Havoc', 'Sword', 4, 'Danjin in Wuthering Waves is a 4 Stars Havoc character who wields a Sword as their weapon type.\r\n\r\nWith a vengeful blade of condensed blood in hand, Ranger Danjin hunts down thieves and bandits for retribution. She journeys to distant lands in pursuit of justice.', 'danjin.jpg', NULL, NULL, NULL),
(48, 'Taoqi', 'Havoc', 'Broadblade', 4, 'Taoqi in Wuthering Waves is a 4 Stars Havoc character who wields a Broadblade as their weapon type.\r\n\r\nTaoqi is the director of border defense at the Ministry of Development. Despite her seemingly laid-back demeanor, she consistently proves to be a dependable and supportive individual, always lending her hand to those in need. Taoqi is not only a reliable colleague, but also a trustworthy friend that people can confide in.', 'taoqi.jpg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `echoes`
--

CREATE TABLE `echoes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `cost` int(11) NOT NULL,
  `is_phantom` tinyint(1) DEFAULT 0,
  `sonata_effect` varchar(100) DEFAULT 'Various',
  `image_url` varchar(255) DEFAULT 'default_echo.jpg',
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `echoes`
--

INSERT INTO `echoes` (`id`, `name`, `cost`, `is_phantom`, `sonata_effect`, `image_url`, `description`) VALUES
(1, 'Feilian Beringal', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(2, 'Nightmare: Feilian Beringal', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(3, 'Impermanence Heron', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(4, 'Nightmare: Impermanence Heron', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(5, 'Mourning Aix', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(6, 'Nightmare: Mourning Aix', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(7, 'Lampylumen Myriad', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(8, 'Crownless', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(9, 'Nightmare: Crownless', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(10, 'Dreamless', 4, 0, 'Various', 'default_echo.jpg', 'Calamity class echo.'),
(11, 'Dragon of Dirge', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(12, 'Bell-Borne Geochelone', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(13, 'Nightmare: Lampylumen Myriad', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(14, 'Mech Abomination', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(15, 'Hyvatia', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(16, 'Reactor Husk', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(17, 'Tempest Mephis', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(18, 'Nightmare: Tempest Mephis', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(19, 'Nightmare: Thundering Mephis', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(20, 'Thundering Mephis', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(21, 'Inferno Rider', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(22, 'Nightmare: Inferno Rider', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(23, 'Lorelei', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(24, 'Sentry Construct', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(25, 'Lioness of Glory', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(26, 'Nightmare: Kelpie', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(27, 'The False Sovereign', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(28, 'Lady of the Sea', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(29, 'Nameless Explorer', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(30, 'Hecate', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(31, 'Nightmare: Hecate', 4, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(32, 'Fallacy of No Return', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(33, 'Reminiscence: Fenrico', 4, 0, 'Various', 'default_echo.jpg', 'Reminiscence variant.'),
(34, 'Jué', 4, 0, 'Various', 'default_echo.jpg', 'Calamity class echo.'),
(35, 'Reminiscence: Fleurdelys', 4, 0, 'Various', 'default_echo.jpg', 'Reminiscence variant.'),
(36, 'Reminiscence: Threnodian - Leviathan', 4, 0, 'Various', 'default_echo.jpg', 'Reminiscence variant.'),
(37, 'Sigillum', 4, 0, 'Various', 'default_echo.jpg', 'Overlord class echo.'),
(38, 'Abyssal Gladius', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(39, 'Abyssal Mercator', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(40, 'Abyssal Patricius', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(41, 'Autopuppet Scout', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(42, 'Capitaneus', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(43, 'Carapace', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(44, 'Chasm Guardian', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(45, 'Chop Chop', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(46, 'Corrosaurus', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(47, 'Cuddle Wuddle', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(48, 'Cyan-Feathered Heron', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(49, 'Diurnus Knight', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(50, 'Flautist', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(51, 'Flora Reindeer', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(52, 'Frostbite Coleoid', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(53, 'Glacio Dreadmane', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(54, 'Glommoth', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(55, 'Havoc Dreadmane', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(56, 'Hoochief', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(57, 'Hurriclaw', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(58, 'Ironhoof', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(59, 'Kerasaur', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(60, 'Kronablight', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(61, 'Lightcrusher', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(62, 'Lumiscale Construct', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(63, 'Mining Reindeer', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(64, 'Nightmare: Cyan-Feathered Heron', 3, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(65, 'Nightmare: Roseshroom', 3, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(66, 'Nightmare: Tambourinist', 3, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(67, 'Nightmare: Violet-Feathered Heron', 3, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(68, 'Nightmare: Viridblaze Saurian', 3, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(69, 'Nocturnus Knight', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(70, 'Pilgrim\'s Shell', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(71, 'Questless Knight', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(72, 'Rage Against the Statue', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(73, 'Reminiscence - Kronaclaw', 3, 0, 'Various', 'default_echo.jpg', 'Reminiscence variant.'),
(74, 'Rocksteady Guardian', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(75, 'Roseshroom', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(76, 'Sabercat Prowler', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(77, 'Sabercat Reaver', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(78, 'Spacetrek Explorer', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(79, 'Spearback', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(80, 'Stonewall Bracer', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(81, 'Tambourinist', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(82, 'Twin Nova - Collapsar Blade', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(83, 'Twin Nova - Nebulous Cannon', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(84, 'Violet-Feathered Heron', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(85, 'Viridblaze Saurian', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(86, 'Vitreum Dancer', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(87, 'Windlash Coleoid', 3, 0, 'Various', 'default_echo.jpg', 'Elite class echo.'),
(88, 'Aero Drake', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(89, 'Aero Predator', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(90, 'Aero Prism', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(91, 'Baby Viridblaze Saurian', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(92, 'Calcified Junrock', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(93, 'Chest Mimic', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(94, 'Chirpuff', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(95, 'Chop Chop: Headless', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(96, 'Chop Chop: Leftless', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(97, 'Chop Chop: Rightless', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(98, 'Clang Bang', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(99, 'Cruisewing', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(100, 'Devotee\'s Flesh', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(101, 'Diamondclaw', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(102, 'Diggy Duggy', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(103, 'Dwarf Cassowary', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(104, 'Electro Drake', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(105, 'Electro Predator', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(106, 'Excarat', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(107, 'Fae Ignis', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(108, 'Fission Junrock', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(109, 'Flora Drone', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(110, 'Frostscourge Stalker', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(111, 'Fusion Drake', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(112, 'Fusion Dreadmane', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(113, 'Fusion Prism', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(114, 'Fusion Warrior', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(115, 'Geospider S4', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(116, 'Galescourge Stalker', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(117, 'Glacio Drake', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(118, 'Glacio Predator', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(119, 'Golden Junrock', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(120, 'Glacio Prism', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(121, 'Gulpuff', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(122, 'Havoc Drake', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(123, 'Havoc Prism', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(124, 'Havoc Warrior', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(125, 'Hoartoise', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(126, 'Hocus Pocus', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(127, 'Hooscamp', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(128, 'Iceglint Dancer', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(129, 'La Guardia', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(130, 'Lava Larva', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(131, 'Lottie Lost', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(132, 'Mining Drone', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(133, 'Nightmare: Aero Predator', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(134, 'Nightmare: Baby Roseshroom', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(135, 'Nightmare: Baby Viridblaze Saurian', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(136, 'Nightmare: Chirpuff', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(137, 'Nightmare: Dwarf Cassowary', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(138, 'Nightmare: Electro Predator', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(139, 'Nightmare: Glacio Predator', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(140, 'Nightmare: Gulpuff', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(141, 'Nightmare: Havoc Warrior', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(142, 'Nightmare: Tick Tack', 1, 1, 'Various', 'default_echo.jpg', 'Nightmare variant.'),
(143, 'Nimbus Wraith', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(144, 'Sabyr Boar', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(145, 'Sacerdos', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(146, 'Sagittario', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(147, 'Shadow Stepper', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(148, 'Snip Snap', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(149, 'Spectro Drake', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(150, 'Spectro Prism', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(151, 'Tick Tack', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(152, 'Traffic Illuminator', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(153, 'Tremor Warrior', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(154, 'Vanguard Junrock', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(155, 'Voltscourge Stalker', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(156, 'Whiff Whaff', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(157, 'Young Roseshroom', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(158, 'Zig Zag', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.'),
(159, 'Zip Zap', 1, 0, 'Various', 'default_echo.jpg', 'Common class echo.');

-- --------------------------------------------------------

--
-- Table structure for table `weapons`
--

CREATE TABLE `weapons` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `rarity` int(11) DEFAULT NULL,
  `main_stat` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT 'default_weapon.jpg',
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weapons`
--

INSERT INTO `weapons` (`id`, `name`, `type`, `rarity`, `main_stat`, `image_url`, `description`) VALUES
(1, 'Verdant Summit', 'Broadblade', 5, 'Crit DMG', 'verdant_summit.jpg', 'Increases Heavy Attack DMG. Best for Jiyan.'),
(2, 'Ages of Harvest', 'Broadblade', 5, 'Crit Rate', 'ages_of_harvest.jpg', 'Increases all Attribute DMG. Best for Jinhsi.'),
(3, 'Lustrous Razor', 'Broadblade', 5, 'ATK%', 'lustrous_razor.jpg', 'Increases Energy Regen.'),
(4, 'Thunderflare Dominion', 'Broadblade', 5, 'Crit DMG', 'thunderflare.jpg', 'Boosts Electro damage and resonance skill.'),
(5, 'Emerald of Genesis', 'Sword', 5, 'Crit Rate', 'emerald_of_genesis.jpg', 'Increases Energy Regen and ATK.'),
(6, 'Blazing Brilliance', 'Sword', 5, 'Crit DMG', 'blazing_brilliance.jpg', 'Increases Resonance Skill DMG and ATK.'),
(7, 'Red Spring', 'Sword', 5, 'Crit Rate', 'red_spring.jpg', 'A versatile sword for DPS characters.'),
(8, 'Everbright Polestar', 'Sword', 5, 'Crit DMG', 'everbright.jpg', 'Increases standard attack output.'),
(9, 'Unflickering Valor', 'Sword', 5, 'ATK%', 'unflickering.jpg', 'Massive attack boost for frontline fighters.'),
(10, 'Static Mist', 'Pistols', 5, 'Crit Rate', 'static_mist.jpg', 'Increases Energy Regen. Buffs incoming Resonator.'),
(11, 'The Last Dance', 'Pistols', 5, 'Crit DMG', 'the_last_dance.jpg', 'Massive burst damage booster.'),
(12, 'Woodland Aria', 'Pistols', 5, 'Crit Rate', 'woodland_aria.jpg', 'Enhances rapid fire modes.'),
(13, 'Lux & Umbra', 'Pistols', 5, 'ATK%', 'lux_umbra.jpg', 'Dual pistols with high utility and team buffs.'),
(14, 'Abyss Surges', 'Gauntlets', 5, 'ATK%', 'abyss_surges.jpg', 'Increases Energy Regen and Basic Attack DMG.'),
(15, 'Verity\'s Handle', 'Gauntlets', 5, 'Crit Rate', 'veritys_handle.jpg', 'Increases Resonance Liberation DMG.'),
(16, 'Moongazer\'s Sigil', 'Gauntlets', 5, 'Crit DMG', 'moongazers_sigil.jpg', 'Boosts quick combo damage and provides shields.'),
(17, 'Daybreaker\'s Spine', 'Gauntlets', 5, 'Crit Rate', 'daybreaker_spine.jpg', 'Enhances counter-attack output and stagger resistance.'),
(18, 'Cosmic Ripples', 'Rectifier', 5, 'ATK%', 'cosmic_ripples.jpg', 'Increases Basic Attack DMG per stack.'),
(19, 'Stringmaster', 'Rectifier', 5, 'Crit Rate', 'stringmaster.jpg', 'Boosts attribute damage and ATK.'),
(20, 'Rime-Draped Sprouts', 'Rectifier', 5, 'Crit DMG', 'rime_draped.jpg', 'Increases Basic Attack DMG.'),
(21, 'Stellar Symphony', 'Rectifier', 5, 'HP%', 'stellar_symphony.jpg', 'Increases team ATK and HP.'),
(22, 'Autumntrace', 'Broadblade', 4, 'Crit Rate', 'autumntrace.jpg', 'Increases ATK on taking damage.'),
(23, 'Discord', 'Broadblade', 4, 'Energy Regen', 'discord.jpg', 'Restores Resonance Energy.'),
(24, 'Helios Cleaver', 'Broadblade', 4, 'ATK%', 'helios_cleaver.jpg', 'Increases ATK stacking over time.'),
(25, 'Dauntless Evernight', 'Broadblade', 4, 'DEF%', 'dauntless_evernight.jpg', 'Increases DEF and ATK.'),
(26, 'Waning Redshift', 'Broadblade', 4, 'ATK%', 'waning_redshift.jpg', 'High attack scaling for sub-DPS.'),
(27, 'Commando of Conviction', 'Sword', 4, 'ATK%', 'commando.jpg', 'Increases ATK after Resonance Skill.'),
(28, 'Lunar Cutter', 'Sword', 4, 'ATK%', 'lunar_cutter.jpg', 'Grants stacks that increase ATK.'),
(29, 'Lumingloss', 'Sword', 4, 'ATK%', 'lumingloss.jpg', 'Increases Basic and Heavy Attack DMG.'),
(30, 'Endless Collapse', 'Sword', 4, 'Crit Rate', 'endless_collapse.jpg', 'Good for sustained combat and energy regen.'),
(31, 'Frostburn', 'Sword', 4, 'Crit DMG', 'frostburn.jpg', 'Empowers elemental reactions and burst.'),
(32, 'Undying Flame', 'Pistols', 4, 'ATK%', 'undying_flame.jpg', 'Increases Resonance Skill DMG.'),
(33, 'Novaburst', 'Pistols', 4, 'ATK%', 'novaburst.jpg', 'Increases ATK when dashing.'),
(34, 'Cadenza', 'Pistols', 4, 'Energy Regen', 'cadenza.jpg', 'Restores Concerto Energy.'),
(35, 'Thunderbolt', 'Pistols', 4, 'Crit Rate', 'thunderbolt.jpg', 'Fast attacking pistol with reliable crit.'),
(36, 'Solar Flame', 'Pistols', 4, 'ATK%', 'solar_flame.jpg', 'Good sustained damage for off-field units.'),
(37, 'Amity Accord', 'Gauntlets', 4, 'DEF%', 'amity_accord.jpg', 'Increases Resonance Liberation DMG.'),
(38, 'Hollow Mirage', 'Gauntlets', 4, 'ATK%', 'hollow_mirage.jpg', 'Grants Iron Armor stacks for ATK/DEF.'),
(39, 'Stonard', 'Gauntlets', 4, 'Crit Rate', 'stonard.jpg', 'Increases Resonance Liberation DMG.'),
(40, 'Marcato', 'Gauntlets', 4, 'Energy Regen', 'marcato.jpg', 'Restores Concerto Energy.'),
(41, 'Aether Strike', 'Gauntlets', 4, 'Crit DMG', 'aether_strike.jpg', 'High burst capability for quick swappers.'),
(42, 'Jinzhou Keeper', 'Rectifier', 4, 'ATK%', 'jinzhou_keeper.jpg', 'Increases ATK and HP.'),
(43, 'Variation', 'Rectifier', 4, 'Energy Regen', 'variation.jpg', 'Restores Concerto Energy.'),
(44, 'Augment', 'Rectifier', 4, 'Crit Rate', 'augment.jpg', 'Increases ATK when using Liberation.'),
(45, 'Comet Flare', 'Rectifier', 4, 'HP%', 'comet_flare.jpg', 'Increases Healing Bonus.'),
(46, 'Waning Moon', 'Rectifier', 4, 'Crit DMG', 'waning_moon.jpg', 'Versatile rectifier for sub-DPS.'),
(47, 'Broadblade of Voyager', 'Broadblade', 3, 'Energy Regen', 'broadblade_voyager.jpg', 'Restores Resonance Energy upon using Resonance Skill.'),
(48, 'Broadblade of Night', 'Broadblade', 3, 'ATK%', 'broadblade_night.jpg', 'Increases ATK after Intro Skill is cast.'),
(49, 'Guardian Broadblade', 'Broadblade', 3, 'ATK%', 'guardian_broadblade.jpg', 'Increases Basic and Heavy Attack DMG.'),
(50, 'Originite: Type I', 'Broadblade', 3, 'DEF%', 'originite_type1.jpg', 'Restores HP upon dealing damage.'),
(51, 'Sword of Voyager', 'Sword', 3, 'Energy Regen', 'sword_voyager.jpg', 'Restores Resonance Energy upon using Resonance Skill.'),
(52, 'Sword of Night', 'Sword', 3, 'ATK%', 'sword_night.jpg', 'Increases ATK after Intro Skill is cast.'),
(53, 'Guardian Sword', 'Sword', 3, 'ATK%', 'guardian_sword.jpg', 'Increases Resonance Skill DMG.'),
(54, 'Originite: Type II', 'Sword', 3, 'DEF%', 'originite_type2.jpg', 'Restores HP upon dealing damage.'),
(55, 'Pistols of Voyager', 'Pistols', 3, 'Energy Regen', 'pistols_voyager.jpg', 'Restores Resonance Energy upon using Resonance Skill.'),
(56, 'Pistols of Night', 'Pistols', 3, 'ATK%', 'pistols_night.jpg', 'Increases ATK after Intro Skill is cast.'),
(57, 'Guardian Pistols', 'Pistols', 3, 'ATK%', 'guardian_pistols.jpg', 'Increases Resonance Skill DMG.'),
(58, 'Originite: Type III', 'Pistols', 3, 'DEF%', 'originite_type3.jpg', 'Restores HP upon dealing damage.'),
(59, 'Gauntlets of Voyager', 'Gauntlets', 3, 'Energy Regen', 'gauntlets_voyager.jpg', 'Restores Resonance Energy upon using Resonance Skill.'),
(60, 'Gauntlets of Night', 'Gauntlets', 3, 'ATK%', 'gauntlets_night.jpg', 'Increases ATK after Intro Skill is cast.'),
(61, 'Guardian Gauntlets', 'Gauntlets', 3, 'ATK%', 'guardian_gauntlets.jpg', 'Increases Resonance Skill DMG.'),
(62, 'Originite: Type IV', 'Gauntlets', 3, 'DEF%', 'originite_type4.jpg', 'Restores HP upon dealing damage.'),
(63, 'Rectifier of Voyager', 'Rectifier', 3, 'Energy Regen', 'rectifier_voyager.jpg', 'Restores Resonance Energy upon using Resonance Skill.'),
(64, 'Rectifier of Night', 'Rectifier', 3, 'ATK%', 'rectifier_night.jpg', 'Increases ATK after Intro Skill is cast.'),
(65, 'Guardian Rectifier', 'Rectifier', 3, 'ATK%', 'guardian_rectifier.jpg', 'Increases Basic and Heavy Attack DMG.'),
(66, 'Originite: Type V', 'Rectifier', 3, 'DEF%', 'originite_type5.jpg', 'Restores HP upon dealing damage.'),
(67, 'Tyro Broadblade', 'Broadblade', 2, 'ATK%', 'tyro_broadblade.jpg', 'Basic 2-star weapon. Increases ATK slightly.'),
(68, 'Tyro Sword', 'Sword', 2, 'ATK%', 'tyro_sword.jpg', 'Basic 2-star weapon. Increases ATK slightly.'),
(69, 'Tyro Pistols', 'Pistols', 2, 'ATK%', 'tyro_pistols.jpg', 'Basic 2-star weapon. Increases ATK slightly.'),
(70, 'Tyro Gauntlets', 'Gauntlets', 2, 'ATK%', 'tyro_gauntlets.jpg', 'Basic 2-star weapon. Increases ATK slightly.'),
(71, 'Tyro Rectifier', 'Rectifier', 2, 'ATK%', 'tyro_rectifier.jpg', 'Basic 2-star weapon. Increases ATK slightly.'),
(72, 'Training Broadblade', 'Broadblade', 1, 'ATK%', 'training_broadblade.jpg', 'Standard issue training weapon.'),
(73, 'Training Sword', 'Sword', 1, 'ATK%', 'training_sword.jpg', 'Standard issue training weapon.'),
(74, 'Training Pistols', 'Pistols', 1, 'ATK%', 'training_pistols.jpg', 'Standard issue training weapon.'),
(75, 'Training Gauntlets', 'Gauntlets', 1, 'ATK%', 'training_gauntlets.jpg', 'Standard issue training weapon.'),
(76, 'Training Rectifier', 'Rectifier', 1, 'ATK%', 'training_rectifier.jpg', 'Standard issue training weapon.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `echoes`
--
ALTER TABLE `echoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weapons`
--
ALTER TABLE `weapons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `echoes`
--
ALTER TABLE `echoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `weapons`
--
ALTER TABLE `weapons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
