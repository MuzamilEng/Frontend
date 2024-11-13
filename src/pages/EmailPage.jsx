import React, { useState } from 'react';
import { Mail, Send, FileText, Plus, X, ChevronDown, Loader } from 'lucide-react';
import Layout from '../layout/layout';
import axios from 'axios';
import { toast } from 'sonner';

const EmailPage = () => {
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    message: '',
    language: 'none'
  });

  const [attachments, setAttachments] = useState([]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailContentByLanguage = {
    EN: {
      subject: 'Hello!',
      message: 'This is an email in English.'
    },
    DE: {
      subject: 'Hallo!',
      message: 'Dit is een e-mail in het Nederlands.'
    },
    FR: {
      subject: 'Hallo!',
      message: 'Dies ist eine E-Mail auf Deutsch.'
    }
  };

  const handleLanguageSelect = (languageKey) => {
    setEmailForm({
      ...emailForm,
      language: languageKey
    });
    setShowLanguages(false);
  };

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader
    try {
      const res = await axios.post('http://localhost:9000/store/sendTranslatedEmail', {
        to: emailForm.to,
        subject: emailForm.subject,
        message: emailForm.message,
        language: emailForm.language
      });
      toast.success('Email sent successfully!',{
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      console.log('Email Form:', emailForm);
      console.log('Attachments:', attachments);
    } catch (err) {
      toast.error('Failed to send email.');
      console.log(err);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Compose Email</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            {/* Language Selection */}
            <div className="mb-6">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLanguages(!showLanguages)}
                  className="w-full md:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FileText size={20} />
                  <span>Select Language</span>
                  <ChevronDown size={16} />
                </button>

                {showLanguages && (
                  <div className="absolute z-10 mt-2 w-full md:w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                    {Object.keys(emailContentByLanguage).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleLanguageSelect(key)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg capitalize"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="email"
                value={emailForm.to}
                onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="recipient@example.com"
                required
              />
            </div>

            {/* Subject Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email subject"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-64 resize-none"
                placeholder="Write your email message here..."
                required
              />
            </div>

            {/* Attachments */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Plus size={20} />
                <span>Add Attachment</span>
                <input
                  type="file"
                  onChange={handleAttachment}
                  className="hidden"
                  multiple
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
                <span>{isLoading ? 'Sending...' : 'Send Email'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EmailPage;
