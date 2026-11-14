import type { Faq } from '../types/index.ts';

// Questions about the project itself. Service-specific answers (cedula, business permits, civil
// registry…) return once Corella's Citizen's Charter has been verified.
export const faqs: Faq[] = [
  {
    "q": "Is this the official website of the Municipality of Corella?",
    "a": "No. BetterCorella is an independent, volunteer civic project. It does not speak for the municipal government. Every dataset links to the official source it came from, so you can check it.",
    "link": "/about",
    "source": "Project disclosure"
  },
  {
    "q": "Why do some pages say information is coming soon?",
    "a": "We only publish Corella information after checking it against an official source, such as the municipal Citizen's Charter, PSA, DILG or BLGF records. Until a dataset is verified, its page shows a notice instead of guessing.",
    "link": "/about",
    "source": "Project policy"
  },
  {
    "q": "How do I report an emergency?",
    "a": "Call 911 for police, fire, or medical emergencies anywhere in the Philippines. Corella's local emergency numbers will be listed on the hotlines page once they are verified.",
    "link": "/government/hotlines",
    "source": "National Emergency Hotline 911"
  },
  {
    "q": "Where can I find national government services online?",
    "a": "The online services page links to national portals such as eGov PH, the Central Business Portal, PhilJobNet and PhilGEPS.",
    "link": "/online-services",
    "source": "National e-government portals"
  },
  {
    "q": "How can I help or report wrong information?",
    "a": "Open an issue on the project's GitHub page with the page address, what is wrong, and a link to the official source. You can also share official documents, such as the Citizen's Charter or barangay lists, so they can be added.",
    "link": "https://github.com/ashdroidcmd/bettercorella/issues",
    "source": "Project contribution guide"
  }
];
