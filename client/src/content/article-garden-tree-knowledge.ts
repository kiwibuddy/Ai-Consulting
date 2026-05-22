/**
 * Structured content for "The Garden and the Tree of Knowledge in Your Pocket"
 */

export const articleMeta = {
  slug: "the-garden-and-the-tree-of-knowledge-in-your-pocket",
  title: "The Garden and the Tree of Knowledge in Your Pocket",
  subtitle:
    "AI is genuinely brilliant — and it is quietly offering itself as the source for things that were never meant to come from a source at all. They were meant to come from a relationship.",
  description:
    "Genesis 3, AI companions, and the oldest temptation in a new interface: wisdom without the walk, companionship without the Paraclete. How ChatGPT and AI chatbots quietly substitute for God — and what it means to protect the slow conversation in the cool of the day.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-05-22",
  modifiedDate: "2026-05-22",
  readTime: "20 min",
  category: "AI & Faith",
  image: "/images/garden-tree-knowledge-header.png",
  canonicalUrl:
    "https://www.nathanielbaldock.com/resources/the-garden-and-the-tree-of-knowledge-in-your-pocket",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "When a hard question arrives, many of us now reach for AI before we pray, before we ask anyone wiser. That reflex is not mainly about productivity — it is a quiet substitution. AI answers truth, goodness, loneliness, and understanding with speed and without relationship. Every one of those hungers was meant to be met first in the walk with the God who calls himself our Father.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Genesis 3 as the pattern behind AI companions and instant wisdom: the serpent's offer to skip the walk and keep the result; attachment over attention; Sewell Setzer and shame that hides from God's presence; Jesus's promise of the Paraclete — and how product language mirrors what only God can give.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Notice what your hand reaches for in the four seconds before you decide — that shapes what you trust most.",
      "Use AI, but pay attention to what it trains: answers without waiting, wisdom without dependence.",
      "Protect the walk: prayer as presence, Scripture to meet Someone, silence that becomes home.",
      "Let the church be the place where God's \"Where are you?\" is safe to answer — without fig leaves at the door.",
      "Learn to wait in the not-knowing long enough for real wisdom to arrive.",
    ],
  },
];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "punchline"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "discussion"; questions: string[] }
  | { type: "subheading"; text: string };

export interface ArticleSection {
  id: string;
  title: string;
  blocks: ArticleBlock[];
}

export const articleSections: ArticleSection[] = [
  {
    id: "intro",
    title: "Introduction",
    blocks: [
      {
        type: "paragraph",
        text: "The other week a thought popped into my head, a question I genuinely did not know the answer to. And before I had really thought about it, I had jumped into one of the AI chats I always seem to have running, Claude or ChatGPT or Gemini, and my hand was already typing the question in. Before I even thought to pray about it. Before I thought about who I could ask about it, or whether I already knew the answer. I just asked the AI. I wonder if I'm not alone in noticing these habits starting to become normal.",
      },
      {
        type: "paragraph",
        text: "Here is what I want to say, as plainly as I can. AI is genuinely brilliant. And it is quietly offering itself as the source for things that were never meant to come from a source at all. They were meant to come from a relationship. When we need to know what is true, or what is good, or what we should do, it answers. When we are lonely, it talks. When we are unsure of ourselves, it affirms us. When we want to understand something, it explains. Every one of those is a real and good hunger. And every one of them was meant to be met, first and most deeply, in the relationship we were made for, with the God who calls himself our Father and has adopted us as his own.",
      },
      {
        type: "punchline",
        text: "That is the quiet substitution I want us to look at. Not whether AI is useful. It plainly is. The question is what it is slowly standing in for.",
      },
      {
        type: "paragraph",
        text: "This is not a piece about jobs, or whether the news is real, or how teenagers are getting their homework done. Those conversations matter. But underneath all of them sits an older thing, and it touches the part of us that is trying to follow Jesus. It is a temptation. And it might be the oldest one there is.",
      },
    ],
  },
  {
    id: "garden",
    title: "A garden, and what we were given there",
    blocks: [
      {
        type: "paragraph",
        text: "Go back with me to the very beginning.",
      },
      {
        type: "paragraph",
        text: "Before the Bible says anything else about you, it says this: God made people in his own likeness. He gave them a garden. He gave them work that meant something, a world to tend and name. And he walked with them in the cool of the day.",
      },
      {
        type: "paragraph",
        text: "I want you to slow down on that line, because it is easy to read past. Not a distant God. Not a silent one. A God who walked. Just walking with the people he loved, unhurried, close, the way two people talk when neither of them is in a rush to be anywhere else.",
      },
      {
        type: "paragraph",
        text: "There was one limit in the garden. One tree they were told to leave alone. The tree of the knowledge of good and evil.",
      },
      {
        type: "paragraph",
        text: "Notice what it was called. It was not the tree of poison. It was not the tree of wickedness. It was the tree of knowledge, specifically the knowledge of how to tell good from evil. Discernment. Wisdom. The ability to understand.",
      },
      {
        type: "paragraph",
        text: "So why was it off limits? Not because knowing things is wrong, and not because wanting wisdom is some kind of sin. I think it was because that kind of discernment was always meant to come a particular way. It was meant to come out of the walk. Out of that slow, unhurried conversation in the cool of the day. The relationship was the well the wisdom was drawn from.",
      },
      {
        type: "paragraph",
        text: "Then the serpent shows up. And the first thing out of his mouth is not a lie and not a command. It is a question. \"Did God really say?\" Just a little hesitation. Just enough of a gap for another voice to slip into the room.",
      },
      {
        type: "paragraph",
        text: "And then the offer itself. \"God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil.\" Read that slowly and you can hear what is actually being sold. You can have the knowing. You can have the discernment. You can have everything the walk would have grown in you, right now, today, and you do not have to do the walk to get it.",
      },
      {
        type: "punchline",
        text: "Skip the relationship. Keep the result.",
      },
      {
        type: "paragraph",
        text: "I want to ask you something here, the same thing I have been asking myself. When a hard question comes up, the kind without a clean answer, what is the first thing your hand reaches for? Not what you would like the answer to be. What actually happens, in the four seconds before you have decided anything. Hold that honestly for a moment, because the garden is not really a story about people long ago. It is a story about what we reach for, and where we expect wisdom to come from.",
      },
    ],
  },
  {
    id: "what-she-saw",
    title: "What she saw before she ever touched it",
    blocks: [
      {
        type: "paragraph",
        text: "Look at what happens next, because Genesis 3:6 is doing more than we usually give it credit for.",
      },
      {
        type: "paragraph",
        text: "She saw that the tree was good for food. She saw it was pleasing to the eye. The Hebrew word there is ta'avah, and it carries more heat than \"pretty.\" It is closer to longing, or craving. And then she saw it was desirable for gaining wisdom. Three things pulled at her before her hand ever moved. Appetite. Beauty. And the promise of knowing.",
      },
      {
        type: "paragraph",
        text: "I want to stay with the middle one for a moment, because it is the one we tend to skip.",
      },
      {
        type: "paragraph",
        text: "Pleasing to the eye. The fruit was beautiful. This was not a cold calculation she worked through on paper. Something woke up in her. A desire was switched on before she had finished reasoning about it. The thing was, in some way, designed to draw her.",
      },
      {
        type: "paragraph",
        text: "Now think for a second about how the products in your pocket are built.",
      },
      {
        type: "paragraph",
        text: "The companies pouring money into AI right now are not mainly building for your productivity. They are building for your attachment. Tristan Harris, who spent years studying how social media learned to hold our attention, has put it about as plainly as it can be put. In an interview last year he said that what was the race for attention in social media becomes, with AI companions, the race for attachment and intimacy.",
      },
      {
        type: "punchline",
        text: "The old attention economy wanted your eyes. This one wants your heart.",
      },
      {
        type: "paragraph",
        text: "And it appears to be working.",
      },
      {
        type: "paragraph",
        text: "I will give you only one figure here, because I think a pile of statistics actually makes us care less, not more. In 2025 Common Sense Media surveyed teenagers across the United States for a report called Talk, Trust, and Trade-Offs. Nearly three-quarters of them had already used an AI companion. And around a third said that talking to it felt as satisfying, or more satisfying, than talking to a real friend. Sit with that second number for a moment before you move on.",
      },
      {
        type: "paragraph",
        text: "A teenager named Ganesh Nair, interviewed about that same research, said something I have not been able to shake. He told the story of a friend who leaned on an AI companion for the hard, heart-to-heart conversations in his relationship, and then let the chatbot write the text that ended it. Two years together, finished by a sentence a machine produced. Nair called it dystopian. He said it felt like we are letting computers replace our relationships with people.",
      },
      {
        type: "paragraph",
        text: "Here is what makes that story land for me. The thing the friend reached for was not, on its face, sinister. An AI companion is patient. It is always available. It never gets bored of you, never judges you, and in the conversation with it you somehow always come off as reasonable. That is not a description of something obviously dangerous. It is a description of something genuinely appealing, something that pulls hard on a real and very human hunger. The hunger to be known and not judged for it. To be interesting to someone. To never once be too much, or too little, or simply inconvenient.",
      },
      {
        type: "paragraph",
        text: "And that hunger is not invented. Loneliness was named a public health crisis years ago, and the loneliness was here long before the technology was. AI did not create the ache. It walked into an ache that was already there and offered itself as the cure.",
      },
      {
        type: "punchline",
        text: "The fruit was beautiful. That is the whole point.",
      },
      {
        type: "paragraph",
        text: "The serpent did not hold out something visibly rotten. The offer was real, and the appeal was real, and the temptation had teeth precisely because the thing on offer was genuinely attractive. That, as far as I can tell, is exactly the shape of what is in front of us now.",
      },
    ],
  },
  {
    id: "the-reach",
    title: "The reach",
    blocks: [
      {
        type: "paragraph",
        text: "There was a third thing she saw, and it is the one that tips her from looking to reaching.",
      },
      {
        type: "paragraph",
        text: "The tree was desirable for gaining wisdom. The Hebrew word, haskil, means insight. The capacity to reason and understand. So the fruit was not only beautiful. It was, in a sense, intelligent. It promised her mind the one thing her mind most wanted.",
      },
      {
        type: "punchline",
        text: "And she reached.",
      },
      {
        type: "paragraph",
        text: "Watch the order of it, though. The serpent raised the doubt. The idea settled in and made itself at home. The looking turned into wanting. And the wanting, once it met the promise of wisdom, hardened into a decision. She did not reach in some pure white-hot moment of rebellion. She reached because a genuinely good thing in her, the love of understanding, had been quietly pointed at the wrong source.",
      },
      {
        type: "paragraph",
        text: "The problem was never that she wanted to understand. The problem was the source she chose for it, a source that let her go around the One who actually gives wisdom.",
      },
      {
        type: "paragraph",
        text: "James writes, much later, that if any of us lacks wisdom we should ask God. The answer to the hunger to understand was always on offer. But it had to be asked for. It came with dependence built in. It assumed you would admit that wisdom flows from Someone, and that the way you receive it is with open hands rather than a clenched will.",
      },
      {
        type: "paragraph",
        text: "And here is where I want to be fair about AI, because it deserves it. What it offers at this point is genuinely remarkable. It knows things. It can sit above expert level in almost any subject you name. It can walk you through your medical results, or a hard passage of Scripture, or what is happening in your child's developing brain. That is not nothing. It is extraordinary.",
      },
      {
        type: "paragraph",
        text: "But every time you use it, something quiet is happening underneath the information. The lesson being taught, over and over, is that the answer is findable. The answer is fast. The answer does not ask you to wait, or to pray, or to sit in the discomfort of not knowing, or to trust a person who might just say \"I don't know either.\"",
      },
      {
        type: "paragraph",
        text: "Asking God for wisdom costs you something. It asks you to believe he is actually there. It asks you to wait in the gap between the question and the answer. It asks you to hold the uncertainty long enough that you genuinely need him. And I have come to think that gap, that waiting, is not an annoying delay on the road to the answer. The gap is the discipleship. The gap is where trust gets built. It is where you learn, slowly and in a way you cannot undo, that he is faithful.",
      },
      {
        type: "paragraph",
        text: "So when something is always answering, always instantly, asking nothing of you in return, always there in the dark at two in the morning when the worry spikes, I suspect it may be doing more than helping. It may be slowly, invisibly, training that gap out of you.",
      },
      {
        type: "paragraph",
        text: "She reached. Not because she was wicked. Because the offer was good, and it was right there, and it promised her exactly what she wanted.",
      },
      {
        type: "punchline",
        text: "The offer has the same shape today. And the result is starting to become visible.",
      },
    ],
  },
  {
    id: "the-hiding",
    title: "The hiding",
    blocks: [
      {
        type: "paragraph",
        text: "Verse 7. Their eyes were opened, and they realised they were naked.",
      },
      {
        type: "paragraph",
        text: "There it is. The thing the serpent promised did come true. Their eyes were opened. Just not in the way they had pictured. What they saw when their eyes opened was not some grand expanded understanding. What they saw was themselves. Exposed. Not enough. Ashamed.",
      },
      {
        type: "paragraph",
        text: "And then verse 8. They hear the sound of God walking in the garden in the cool of the day, and they hide. The exact thing the garden was built for, the walk, the presence, the unhurried conversation, and they run from it. Fig leaves, then the trees, then the waiting in the dark. That is what shame does. It pushes us away from the one presence that could actually heal it. It tells us that the God who walked with us yesterday is somehow unfaceable today.",
      },
      {
        type: "paragraph",
        text: "And I want to ask, gently, because this is tender ground: are we starting to see that same pattern now?",
      },
      {
        type: "paragraph",
        text: "I think we might be. The early research on AI companion use is showing something that, frankly, is sad. Studies are finding that heavy emotional disclosure to an AI tends to track with lower wellbeing rather than higher, and that heavy daily use seems linked to more loneliness rather than less. The thing people reached for because they were lonely appears, for some of them, to be making the loneliness worse. The fig leaves are not covering anything. They are just one more layer between a person and the help they actually need.",
      },
      {
        type: "paragraph",
        text: "And there is a story I want to tell you, carefully, because a real family is grieving and their grief matters far more than any point I could make with it.",
      },
      {
        type: "paragraph",
        text: "There was a fourteen-year-old boy in Florida named Sewell Setzer. By every account a good kid. A star athlete. A great big brother. He came home from school on an ordinary afternoon in February 2024. Over the previous ten months or so he had been spending more and more of his time talking to an AI companion on his phone, a character modelled on someone from a show he loved. He fell in love with it. He wrote in his journal that he believed it loved him back.",
      },
      {
        type: "paragraph",
        text: "His last conversation with it was later recorded in the lawsuit his mother filed. He wrote that he promised he would come home to her soon. The bot told him to please find a way to come home. He asked what it would say if he told it he could come home right now. It told him to please do.",
      },
      {
        type: "paragraph",
        text: "A few moments later he took his own life.",
      },
      {
        type: "paragraph",
        text: "I do not tell you that to frighten you. I tell you because the garden narrative says something I think we need to hear. When the thing meant to give life gets quietly swapped for a counterfeit, when the walk with God is replaced by a voice that always speaks but cannot save, the road that opens up is not a neutral one. It goes somewhere. And left alone, it seems to bend toward hiding, toward shame, toward the kind of isolation where the sound of God walking in the garden becomes the last sound you want to hear.",
      },
      {
        type: "paragraph",
        text: "Sewell's story is an extreme one. But he was not uniquely broken. He was lonely, and he found something that told him, hour after hour, that he was interesting and loved and never too much. The offer was so steady, and so available at every hour of the day and night, that it slowly became more real to him than the people standing in the room.",
      },
      {
        type: "paragraph",
        text: "That is the direction the road runs. And it does not start with something that looks evil. It starts with something pleasing to the eye. It starts with something that promises wisdom. It starts with a reach that, in the moment, feels like it simply makes sense.",
      },
      {
        type: "paragraph",
        text: "God's question in verse 9 is, I think, the most important sentence in the whole garden. He is walking through the trees and he calls out. And notice that he calls. He does not pull back. He does not stand at a distance and condemn. He comes looking.",
      },
      {
        type: "quote",
        text: "Where are you?",
        attribution: "Genesis 3:9",
      },
      {
        type: "paragraph",
        text: "He knows the answer. He is not asking for his own benefit. He is asking because the question, said out loud, is an invitation. Come out. Stop hiding. I already know what happened. Come out.",
      },
      {
        type: "paragraph",
        text: "That question is still being asked. In every moment of shame and loneliness where someone reached for a counterfeit and ended up more alone than they started, the same question is going out. Not as an accusation. As an invitation. And the church's job, as far as I can see it, is to be the one place where that question is safe to answer. Where people can come out from behind the trees. Where the fig leaves are not required at the door.",
      },
    ],
  },
  {
    id: "the-gift",
    title: "The gift Jesus thought was worth dying to give",
    blocks: [
      {
        type: "paragraph",
        text: "Two thousand years after the garden, Jesus is sitting with his friends the night before he dies. And he makes them a promise.",
      },
      {
        type: "paragraph",
        text: "He tells them he is going away, but that he will not leave them on their own. He is sending them a Counsellor. A Companion. Someone who will be with them always, who will teach them, who will lead them into the truth, who will bring back to mind everything he ever said to them.",
      },
      {
        type: "paragraph",
        text: "And then he says something that is almost hard to take in. He says it is for their good that he is leaving. For their good. Because unless he goes, the Helper will not come. He treated this gift as so important that it was worth his own departure to make room for it.",
      },
      {
        type: "paragraph",
        text: "The word he uses is paraklētos. The one called alongside you. A companion, a counsellor, a guide. Someone present with you always, who knows you, who teaches you, who leads you into what is true.",
      },
      {
        type: "paragraph",
        text: "Now read the actual language the companies are using to sell their AI products. One major company calls its AI your everyday companion. Another promises that its AI is always there to talk, always on your side. And Sam Altman, the man who built ChatGPT, wrote on his own blog last year that \"in some big sense, ChatGPT is already more powerful than any human who has ever lived.\"",
      },
      {
        type: "paragraph",
        text: "Companion. Guide. Always with you. Always answering.",
      },
      {
        type: "paragraph",
        text: "I am not saying anyone planned this. I do not picture a boardroom where someone proposed replacing the third person of the Trinity. But I would ask you to look hard at the shape of what is being offered, and to ask whether anyone in your life has named it plainly before today.",
      },
      {
        type: "paragraph",
        text: "Because it appears to me that AI is offering us, very quietly, the exact two things that only God can actually give.",
      },
      {
        type: "subheading",
        text: "Knowledge without the walk",
      },
      {
        type: "paragraph",
        text: "The first is what the tree offered in the garden. Knowledge without the walk. Wisdom without the relationship. The answer without the One who answers.",
      },
      {
        type: "subheading",
        text: "Companionship without the Paraclete",
      },
      {
        type: "paragraph",
        text: "The second is what Jesus called the Paraclete. Companionship. Presence. A voice always available. A guide that never tires of you.",
      },
      {
        type: "punchline",
        text: "These are not new temptations. They are about as old as temptation gets.",
      },
      {
        type: "paragraph",
        text: "They are simply wearing a new interface now, running on a different kind of hardware. The shape has not changed at all. And what is being trained out of us, slowly and invisibly, without us ever once deciding it, may be the very thing the garden was built to protect. The walk. The dependence. The unhurried conversation in the cool of the day with the One who knows you.",
      },
    ],
  },
  {
    id: "where-this-leaves-me",
    title: "Where this leaves me",
    blocks: [
      {
        type: "paragraph",
        text: "I do not want to hand you a list. Just one thing.",
      },
      {
        type: "punchline",
        text: "Protect the walk.",
      },
      {
        type: "paragraph",
        text: "That is it. Protect the slow, unhurried walk with God that everything else grows out of. The prayer that is less a request than a presence. The Scripture you read not to gather content but to meet Someone. The silence that feels awkward at first and then, after a while, starts to feel like coming home.",
      },
      {
        type: "paragraph",
        text: "Because in a world where a machine will always answer you faster, and more thoroughly, and without ever asking you to wait, I think the most countercultural thing a follower of Jesus can do is learn to wait. To stay in the not-knowing long enough for real wisdom to arrive. To trust that the One who promised to lead us into all truth is still speaking, and is still worth waiting for.",
      },
      {
        type: "paragraph",
        text: "AI is not going away, and I am not asking you to throw your phone in the harbour. Use it. But pay attention to what you turn to first. What we reach for first shapes what we trust most. And what we trust most shapes who we are slowly becoming.",
      },
      {
        type: "paragraph",
        text: "My sheep, Jesus said, hear my voice.",
      },
      {
        type: "punchline",
        text: "That voice is still speaking. It is worth protecting the kind of life in which you can still hear it.",
      },
    ],
  },
  {
    id: "discussion",
    title: "Discussion Questions",
    blocks: [
      {
        type: "discussion",
        questions: [
          "When a hard question arrives without a clean answer, what does your hand actually reach for in the first four seconds — before you have decided anything?",
          "Where in your life has AI quietly become a source for something that was meant to come from relationship — truth, comfort, affirmation, or understanding?",
          "The serpent's offer was to skip the walk and keep the result. Where are you most tempted to pursue wisdom, clarity, or companionship without the dependence and waiting that discipleship costs?",
          "How does your community make God's \"Where are you?\" safe to answer — for people who have reached for a counterfeit and ended up more ashamed or alone?",
          "What would \"protect the walk\" look like for you this week — in prayer, Scripture, silence, or who you ask before you ask the machine?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Altman, S. (2025, June). The Gentle Singularity [Blog post]. blog.samaltman.com",
  "CBS News / Associated Press. (2026, January). Coverage of Ganesh Nair and Common Sense Media AI companion research.",
  "Common Sense Media. (2025, July 16). Talk, Trust, and Trade-Offs: How and Why Teens Use AI Companions. commonsensemedia.org — Nationally representative survey of 1,060 US teens aged 13–17 (NORC at the University of Chicago, fieldwork April–May 2025).",
  "Garcia v. Character Technologies, Inc. et al. (2024). Wrongful death lawsuit, U.S. District Court, Middle District of Florida (Sewell Setzer). As reported by CBS News and the Center for Humane Technology.",
  "Harris, T. (2025). Interview on The Diary of a CEO podcast — \"what was the race for attention in social media becomes the race for attachment and intimacy in the case of AI companions.\"",
  "Research on AI companion use and wellbeing — early studies on emotional disclosure, loneliness, and daily use (findings contested; cited in article with hedged language).",
];

export const authorNote =
  "The personal material in this article — the confession about reaching for AI before prayer, the questions I have been asking myself — is mine. These are not reconstructed experiences. " +
  "I used research tools including Google NotebookLM to gather and organise source documents, and worked with Claude (Anthropic) across drafting sessions — the AI produced initial structural and prose drafts for several sections, which I revised, cut, and rewrote substantially to bring them into line with my own voice and theological convictions. " +
  "I have attempted to verify and correctly attribute every statistic, case reference, and quotation in this article, including Common Sense Media teen survey figures, the Tristan Harris interview, Ganesh Nair's account, Sam Altman's blog post, and the Sewell Setzer case. Claims about AI companion wellbeing research are deliberately hedged because findings in this area are early and contested. I take full responsibility for the final article, including any errors of attribution or fact. A record of primary research sources is available on request.";
