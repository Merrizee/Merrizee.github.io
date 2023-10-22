本地同时配置github和gitee

git下载及配置，略过，直接一路点安装，按默认的就行。

配置 名称和邮箱号码：

git config --global user.name "你的名称"

git config --global user.email "邮箱号"

生成github和gitee的 ssh key

在git bash中：

	ssh-keygen -t rsa -C 'github邮箱号' -f ~/.ssh/id_rsa_github

	 ssh-keygen -t rsa -C 'gitee邮箱号' -f ~/.ssh/id_rsa_gitee

会在C:\Users\目录下生成四个文件：id_rsa_gitee、id_rsa_gitee.pub、id_rsa_github、id_rsa_github.pub

新建config文件，内容是

Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitee

Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github

登录gitee和github，新建ssh配置，分别将刚才生成的id_rsa_gitee.pub、id_rsa_github.pub文件中的ssh内容复制到新建的ssh配置里，并保存。

在本地cmd里使用ssh -T git@gitee.com  和  ssh -T git@github.com 分别测试，显示成功！

若是有提示则直接一路回车，应该是初始化。