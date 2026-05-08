import React, { useRef } from 'react'; 
import { Panel, PanelHeaderTemplateOptions, PanelFooterTemplateOptions } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { ScrollPanel } from 'primereact/scrollpanel';

export default function PanelComponent() {
    const configMenu = useRef<Menu>(null);

    const items = [
        { separator: true },
        { label: 'Delete', icon: 'pi pi-times' }
    ];

    const headerTemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Avatar icon="pi pi-user" size="large" shape="circle" />
                    <span className="font-bold">João Lucas</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                </div>
            </div>
        );
    };

    const footerTemplate = (options: PanelFooterTemplateOptions) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text />
                </div>
                <span className="p-text-secondary">Updated 2 hours ago</span>
            </div>
        );
    };

    return (
        <ScrollPanel style={{ width: '100%', height: '500px' }}>
            <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable>
                <p className="m-0">
                    Tudo começou quando decidi fazer um curso online gratuito. Mesmo sem saber nada, fui me desafiando diariamente, resolvendo exercícios e criando pequenos projetos. No início, tudo parecia um bicho de sete cabeças. Variáveis, funções, estruturas de repetição... cada conceito novo me fazia pensar que talvez eu não fosse capaz. Mas a curiosidade sempre falava mais alto. Eu queria entender como os sites funcionavam, como os aplicativos sabiam o que eu estava fazendo, como os jogos reagiam aos comandos. Isso me mantinha motivado. Comecei a criar pequenos programas no navegador, como calculadoras e jogos da velha. Ficava horas testando e refazendo tudo. Quando algo dava certo, era como se eu tivesse vencido um desafio gigante. E quando dava errado — o que acontecia com frequência — eu aprendia ainda mais. Aos poucos, fui ganhando confiança e passei a estudar tópicos mais avançados, como orientação a objetos e estruturas de dados. Lembro bem da primeira vez que usei o GitHub. Subi um projeto com muito orgulho, mesmo que fosse simples. Depois disso, entrei em comunidades, participei de fóruns e percebi que muita gente estava passando ou já tinha passado pelo mesmo caminho. Trocar experiências foi essencial. Hoje olho pra trás e vejo o quanto evoluí. Ainda tenho muito a aprender, claro, mas aquele primeiro passo — o de encarar algo novo — foi o mais importante que dei até agora. Se eu puder dar um conselho pra quem está começando, é: não subestime os pequenos avanços. Cada linha de código conta.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', marginTop: '2rem'}}>
                    <Image src="/images/image.jpg" alt="Image" width="400" preview />
                </div>
            </Panel>
        </ScrollPanel>
    )
}
