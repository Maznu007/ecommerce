import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  Package, 
  CreditCard, 
  RotateCcw,
  Truck
} from "lucide-react";
import Link from "next/link";

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      icon: Package,
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Orders' in your account. Click on any order to see its current status and tracking information."
    },
    {
      icon: CreditCard,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay."
    },
    {
      icon: RotateCcw,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return from your order history."
    },
    {
      icon: Truck,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout for an additional fee."
    },
  ];

  const contactMethods = [
    { icon: MessageCircle, label: "Live Chat", value: "Available 24/7", action: "Start Chat" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", action: "Call Now" },
    { icon: Mail, label: "Email", value: "support@shophub.com", action: "Send Email" },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
          />
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-indigo-600" size={24} />
                </div>
                <p className="font-bold text-slate-900 text-sm">{method.label}</p>
                <p className="text-xs text-slate-500 mt-1">{method.value}</p>
                <button className="text-indigo-600 text-xs font-medium mt-2 hover:underline">
                  {method.action}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-slate-600" size={20} />
                  </div>
                  <span className="flex-1 font-bold text-slate-900">{faq.question}</span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-19">
                        <p className="text-slate-600 leading-relaxed pl-14">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No results found for "{searchQuery}"</p>
            <p className="text-sm text-slate-400 mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}