
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Bot, Wrench } from 'lucide-react';
import { Bot as BotType } from './types';
import { BotEmptyState } from './BotEmptyState';
import { MyBotsList } from './MyBotsList';

const draftBots: BotType[] = [
  {
    id: "grid-trader-1",
    name: "Grid Trader",
    description: "Automated grid trading strategy",
    icon: <Wrench className="h-5 w-5" />,
    iconBgColor: "#FF8C00",
    successRate: 65,
    activeUsers: 423,
    status: "stopped",
    ownerName: "quiztical_curran"
  }
];

export default function MyBotsPage() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [myBots, setMyBots] = useState<BotType[]>(draftBots);

  const hasBots = myBots.length > 0;

  return (
    <div className="min-h-screen flex w-full bg-[#111111] text-white">
      {/* Left Sidebar */}
      <div className="w-56 border-r border-[#333333] bg-[#111111] flex flex-col">
        <div className="p-4 font-semibold border-b border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded bg-[#333333] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="none" rx="0" ry="0"/>
                <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>OmniTrade</span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1">
          <div className="py-4 px-4 border-b border-[#333333] hover:bg-[#222222] cursor-pointer">
            <div className="text-sm font-medium text-white">Dashboard</div>
          </div>
          <div className="py-4 px-4 border-b border-[#333333] hover:bg-[#222222] cursor-pointer">
            <div className="text-sm font-medium text-white">Terminal</div>
          </div>
          <div className="py-4 px-4 border-b border-[#333333] bg-[#222222] cursor-pointer">
            <div className="text-sm font-medium text-white">Bots</div>
            <div className="mt-4 space-y-1">
              <div className="flex items-center py-2 px-3 bg-[#6a0dad] rounded-md text-sm">
                <span>My Bots</span>
                <svg className="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center py-2 px-3 text-[#999999] hover:text-white text-sm transition-colors">
                <span>Available Bots</span>
                <svg className="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="py-4 px-4 border-b border-[#333333] hover:bg-[#222222] cursor-pointer">
            <div className="text-sm font-medium text-white">Earn</div>
          </div>
          <div className="py-4 px-4 border-b border-[#333333] hover:bg-[#222222] cursor-pointer">
            <div className="text-sm font-medium text-white">Markets</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-4 border-t border-[#333333]">
          <h3 className="text-sm font-semibold mb-3">FAQs</h3>
          <ul className="space-y-2 text-xs">
            <li className="text-[#999999] hover:text-white cursor-pointer">What are bots?</li>
            <li className="text-[#999999] hover:text-white cursor-pointer">How do I get started?</li>
            <li className="text-[#999999] hover:text-white cursor-pointer">Can I run multiple bots?</li>
            <li className="text-[#999999] hover:text-white cursor-pointer">What is a backtest?</li>
            <li className="flex items-center text-[#00e676] cursor-pointer mt-4">
              <span>Visit Support Center</span>
              <svg className="ml-2 h-3 w-3" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="h-16 border-b border-[#333333] flex items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white font-medium">Dashboard</a>
            <a href="#" className="text-[#999999] hover:text-white transition-colors">Terminal</a>
            <a href="#" className="text-[#999999] hover:text-white transition-colors border-b-2 border-[#6a0dad] pb-1">Bots</a>
            <a href="#" className="text-[#999999] hover:text-white transition-colors">Earn</a>
            <a href="#" className="text-[#999999] hover:text-white transition-colors">Markets</a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-[#FFCC00]/20 px-2 py-1 rounded flex items-center space-x-1">
              <svg className="h-4 w-4 text-[#FFCC00]" viewBox="0 0 24 24" fill="none">
                <path d="M12 9V2L19 9M12 16L5 9H2V20C2 20.5523 2.44772 21 3 21H16C16.5523 21 17 20.5523 17 20V16H21V9H12V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-[#FFCC00]">UPGRADE</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-white rounded-full bg-[#333333] h-8 w-8 flex items-center justify-center">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="text-white rounded-full bg-[#333333] h-8 w-8 flex items-center justify-center">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="text-white rounded-full bg-[#333333] h-8 w-8 flex items-center justify-center">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-[#444444] flex items-center justify-center text-xs">V</div>
              <span>Vincent</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">My Bots</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Type</span>
                <div className="relative">
                  <select className="appearance-none bg-transparent border border-[#333333] rounded px-3 py-1 pr-8 text-sm">
                    <option>All</option>
                    <option>AI</option>
                    <option>Signal</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="border border-[#333333] rounded-md flex">
                <button onClick={() => setViewType('list')} className={`p-2 ${viewType === 'list' ? 'bg-[#333333]' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                  </svg>
                </button>
                <button onClick={() => setViewType('grid')} className={`p-2 ${viewType === 'grid' ? 'bg-[#333333]' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
              </div>
              <Button className="flex items-center space-x-1 bg-[#00e676] hover:bg-[#00c853] text-black px-4 py-2 rounded-md">
                <span>FIND A BOT</span>
                <Bot className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {hasBots ? (
            <div>
              <div className="text-sm text-[#999999] mb-3">
                {myBots.length} DRAFTS
              </div>
              <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4`}>
                {myBots.map((bot) => (
                  <div key={bot.id} className="bg-[#222222] border border-[#333333] rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: bot.iconBgColor }}>
                          {bot.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{bot.name}</h3>
                          <div className="text-xs text-[#999999]">
                            {bot.ownerName}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-8 mt-4 bg-[#1E1E1E] rounded-lg">
                        <svg className="w-16 h-16 text-[#555555] mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                        <div className="text-lg font-medium">Draft</div>
                        <div className="text-sm text-[#999999] text-center mt-1">Click to configure this bot</div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-[#333333] flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-[#999999]"></span>
                        <span className="text-xs text-[#999999]">Stopped</span>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#333333] hover:bg-[#333333] text-xs">CONFIGURE</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-[#333333] rounded-full p-6 mb-4">
                <Bot className="h-10 w-10 text-[#6a0dad]" />
              </div>
              <h2 className="text-xl font-medium mb-2">Automate your trading with bots!</h2>
              <p className="text-[#999999] mb-6">Start by selecting a bot</p>
              <Button className="gap-2 bg-[#00e676] hover:bg-[#00c853] text-black px-4 py-2 rounded-md">
                SELECT A BOT
                <Bot className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-10 pb-6 px-6 border-t border-[#333333] bg-[#0F0F0F]">
          <div className="grid grid-cols-4 gap-10">
            <div>
              <h3 className="text-[#00e676] font-medium mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-[#999999] hover:text-white cursor-pointer">Dashboard</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Terminal</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Bots</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Markets</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Pricing & Fees</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00e676] font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-[#999999] hover:text-white cursor-pointer">Blog</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Report a Bug</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Request a Feature</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Support Center</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Referral Program</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00e676] font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-[#999999] hover:text-white cursor-pointer">About</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Contact Us</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Security</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Terms of Use</li>
                <li className="text-[#999999] hover:text-white cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00e676] font-medium mb-3">Socials</h3>
              <div className="flex space-x-3 mb-6">
                <a href="#" className="text-[#999999] hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12397C16.6767 2.90125 15.7395 2.9572 14.8821 3.28445C14.0247 3.6117 13.2884 4.1942 12.773 4.95376C12.2575 5.71332 11.9877 6.61263 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="text-[#999999] hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="text-[#999999] hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.5401 6.42C22.4213 5.94541 22.1796 5.51057 21.8387 5.15941C21.4978 4.80824 21.0708 4.55318 20.6001 4.42C18.8801 4 12.0001 4 12.0001 4C12.0001 4 5.12008 4 3.40008 4.46C2.92933 4.59318 2.50255 4.84824 2.16163 5.19941C1.8207 5.55057 1.57898 5.98541 1.46008 6.46C1.14577 8.20556 0.991565 9.97631 1.00008 11.75C0.988852 13.537 1.14277 15.3213 1.46008 17.08C1.59098 17.5398 1.83833 17.9581 2.17817 18.2945C2.518 18.6308 2.93883 18.8738 3.40008 19C5.12008 19.46 12.0001 19.46 12.0001 19.46C12.0001 19.46 18.8801 19.46 20.6001 19C21.0708 18.8668 21.4978 18.6118 21.8387 18.2606C22.1796 17.9094 22.4213 17.4746 22.5401 17C22.8524 15.2676 23.0064 13.5103 23.0001 11.75C23.0113 9.96295 22.8574 8.1787 22.5401 6.42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <div className="mb-6">
                <div className="mb-2 text-white">Earn $100 USD for each referral</div>
                <button className="flex items-center space-x-1 text-[#00e676]">
                  <span>Share Referral Link</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div>
                <h3 className="text-[#00e676] font-medium mb-2">Available on Mobile</h3>
                <div className="text-xs text-[#999999] mb-2">(New Version Launches Soon)</div>
                <div className="flex space-x-3">
                  <a href="#" className="border border-[#333333] rounded-md p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png" alt="App Store" className="h-5" />
                  </a>
                  <a href="#" className="border border-[#333333] rounded-md p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-xs text-[#666666] max-w-6xl">
            <p className="mb-3">
              Disclaimer: Information contained herein should not be construed as an investment advice, or investment recommendation, or an order of, or solicitation for, any transactions in financial instruments; 
              We make no warranty or representation, whether express or implied, as to the completeness or accuracy of the information contained herein or fitness thereof for a particular purpose. Use of images 
              and symbols is made for illustrative purposes only and does not constitute a recommendation to buy, sell or hold a particular financial instrument. Use of brand logos does not necessarily imply a 
              contractual relationship between us and the entities owning the logos, nor does it represent an endorsement of any such entity by Quad Terminal, or vice versa. Market information is made available to 
              you only as a service, and we do not endorse or approve it.
            </p>
            <p>
              Backtested or simulated performance results have inherent limitations and should not be interpreted as a recommendation to buy or sell any assets nor a guarantee of future returns. Actual results 
              will vary from the analysis and Quad Terminal makes no representation or warranty regarding future performance.
            </p>
          </div>
          <div className="mt-6 text-center text-xs text-[#666666]">
            Copyright © Quadency Global, Ltd (BVI)
          </div>
        </div>
      </div>
    </div>
  );
}
