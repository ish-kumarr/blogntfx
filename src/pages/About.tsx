import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import logoFull from '@/assets/logo-full.png';

const About = () => {
  return (
    <>
    <SEO 
      title="About Us"
      description="Learn about New TradeFx Services - a professional trading and research firm providing high-quality market analysis, educational content, and trading insights for forex traders worldwide."
      url="/about"
      keywords="about new tradefx, forex research team, trading education, market analysis firm"
    />
    <Navbar />
    <PageTransition>
    <div className="min-h-screen bg-background">
      
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-navy-deep">
        <div className="container mx-auto max-w-4xl text-center">
          <img src={logoFull} alt="New TradeFx Services" className="h-10 md:h-16 mx-auto mb-4 md:mb-8" />
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            About New TradeFx Services
          </h1>
          <p className="text-sm md:text-lg text-text-secondary px-2">Professional trading research and market analysis for serious traders.</p>
        </div>
      </section>

      <section className="py-10 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="blog-content">
            <h2>Our Mission</h2>
            <p>New TradeFx Services is a professional trading and research firm dedicated to providing high-quality market analysis, educational content, and trading insights for forex traders worldwide.</p>
            
            <h2>What We Do</h2>
            <p>Our research team combines decades of experience in financial markets with rigorous analytical methods to deliver actionable insights. We focus on:</p>
            <ul>
              <li>In-depth forex market analysis and commentary</li>
              <li>Trading psychology and performance optimization</li>
              <li>Risk management strategies and frameworks</li>
              <li>Technical and fundamental analysis education</li>
              <li>Market structure and institutional flow analysis</li>
            </ul>

            <h2>Our Approach</h2>
            <p>We believe in evidence-based trading. Every strategy we discuss, every pattern we analyze, is backed by research and real-world application. We don't promise easy profits—we provide the knowledge and frameworks needed to develop genuine trading skill.</p>

            <h2>The Research Team</h2>
            <p>Our content is produced by the New TradeFx Research Team, a group of experienced traders, analysts, and educators who are passionate about sharing their knowledge with the trading community.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
    </>
  );
};

export default About;
